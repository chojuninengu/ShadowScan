// src/handlers/health.rs

use axum::{http::StatusCode, Json};

pub async fn health_check() -> (StatusCode, Json<serde_json::Value>) {
    (
        StatusCode::OK,
        Json(serde_json::json!({ "status": "ok" })),
    )
}
