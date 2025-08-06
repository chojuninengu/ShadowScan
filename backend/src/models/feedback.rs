// src/models/feedback.rs

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct Feedback {
    pub id: Uuid,
    pub user_id: Option<Uuid>,
    pub message: String,
    pub is_false_positive: bool,
    pub created_at: DateTime<Utc>,
}
