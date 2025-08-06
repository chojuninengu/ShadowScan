// src/handlers/feedback.rs

use crate::{app_state::AppState, db::feedback_repo, errors::AppError};
use axum::{extract::State, http::StatusCode, Json};
use serde::Deserialize;
use uuid::Uuid;

#[derive(Deserialize)]
pub struct FeedbackRequest {
    pub message: String,
    pub is_false_positive: bool,
    pub related_result_id: Option<Uuid>,
    // user_id could be optional here if we want to allow anonymous feedback
    // for now, we'll assume it's anonymous if not logged in.
}

pub async fn submit_feedback(
    State(state): State<AppState>,
    // Optionally extract user_id if the user is logged in
    // Extension(user_id): Extension<Option<String>>,
    Json(payload): Json<FeedbackRequest>,
) -> Result<(StatusCode, Json<serde_json::Value>), AppError> {
    // let user_id = user_id.and_then(|id| Uuid::parse_str(&id).ok());

    feedback_repo::create_feedback(
        &state.db_pool,
        None, // user_id, // For now, all feedback is anonymous
        &payload.message,
        payload.is_false_positive,
        payload.related_result_id,
    )
    .await
    .map_err(|_| AppError::InternalServerError)?;

    Ok((
        StatusCode::CREATED,
        Json(serde_json::json!({ "status": "success" })),
    ))
}
