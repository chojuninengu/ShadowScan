// src/handlers/scan.rs

use crate::{
    app_state::AppState,
    db::scan_repo,
    errors::AppError,
    models::scan::{Scan, ScanResult},
};
use axum::{
    extract::{Path, State},
    http::StatusCode,
    Extension, Json,
};
use serde::{Deserialize, Serialize};
use serde_json::json;
use uuid::Uuid;

#[derive(Deserialize)]
pub struct ScanRequest {
    // Define the fields for a scan request, e.g., email, username, etc.
    pub email_to_scan: String,
}

#[derive(Serialize)]
pub struct ScanResponse {
    pub scan_id: Uuid,
    pub message: String,
}

pub async fn start_scan(
    State(state): State<AppState>,
    Extension(user_id): Extension<String>,
    Json(payload): Json<ScanRequest>,
) -> Result<(StatusCode, Json<ScanResponse>), AppError> {
    let user_id = Uuid::parse_str(&user_id).map_err(|_| AppError::InternalServerError)?;

    let scan = scan_repo::create_scan(&state.db_pool, user_id)
        .await
        .map_err(|_| AppError::InternalServerError)?;

    let scan_id = scan.id;

    // Spawn a background task to perform the scan
    let app_state = state.clone();
    tokio::spawn(async move {
        run_scan(app_state, scan_id, payload.email_to_scan).await;
    });

    Ok((
        StatusCode::ACCEPTED,
        Json(ScanResponse {
            scan_id,
            message: "Scan started successfully".to_string(),
        }),
    ))
}

async fn run_scan(app_state: AppState, scan_id: Uuid, email_to_scan: String) {
    println!("Starting background scan for scan_id: {}", scan_id);

    if let Err(e) = scan_repo::update_scan_status(&app_state.db_pool, scan_id, "in_progress").await {
        eprintln!("Failed to update scan status: {}", e);
        return;
    }

    // Simulate scanning different sources...
    tokio::time::sleep(std::time::Duration::from_secs(10)).await;

    // Simulate finding a result
    let _ = scan_repo::create_scan_result(
        &app_state.db_pool,
        scan_id,
        "email_leak",
        json!({ "source": "Simulated Breach DB", "leaked_email": email_to_scan }),
        "high",
        Some("https://haveibeenpwned.com/"),
    )
    .await;

    tokio::time::sleep(std::time::Duration::from_secs(5)).await;

    // Simulate another finding
    let _ = scan_repo::create_scan_result(
        &app_state.db_pool,
        scan_id,
        "social_media",
        json!({ "platform": "Twitter", "username": email_to_scan.split('@').next().unwrap_or("") }),
        "low",
        None,
    )
    .await;

    if let Err(e) = scan_repo::update_scan_status(&app_state.db_pool, scan_id, "completed").await {
        eprintln!("Failed to update scan status: {}", e);
    }

    println!("Finished background scan for scan_id: {}", scan_id);
}

#[derive(Serialize)]
pub struct FullScanResult {
    #[serde(flatten)]
    pub scan: Scan,
    pub results: Vec<ScanResult>,
}

pub async fn get_scan_results(
    State(state): State<AppState>,
    Extension(user_id): Extension<String>,
    Path(path_user_id): Path<Uuid>,
) -> Result<(StatusCode, Json<Vec<FullScanResult>>), AppError> {
    let user_id = Uuid::parse_str(&user_id).map_err(|_| AppError::InternalServerError)?;

    // Ensure the authenticated user is requesting their own results
    if user_id != path_user_id {
        return Err(AppError::BadRequest("You can only view your own scan results.".to_string()));
    }

    let scans = scan_repo::get_scans_by_user(&state.db_pool, user_id)
        .await
        .map_err(|_| AppError::InternalServerError)?;

    let mut full_results = Vec::new();
    for scan in scans {
        let results = scan_repo::get_scan_results_by_scan(&state.db_pool, scan.id)
            .await
            .map_err(|_| AppError::InternalServerError)?;
        full_results.push(FullScanResult { scan, results });
    }

    Ok((StatusCode::OK, Json(full_results)))
}
