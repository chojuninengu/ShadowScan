// src/models/scan.rs

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct Scan {
    pub id: Uuid,
    pub user_id: Uuid,
    pub status: String, // e.g., "pending", "in_progress", "completed", "failed"
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct ScanResult {
    pub id: Uuid,
    pub scan_id: Uuid,
    pub finding_type: String, // e.g., "email_leak", "password_leak", "social_media"
    pub details: serde_json::Value,
    pub risk_level: String, // e.g., "low", "medium", "high", "critical"
    pub source_link: Option<String>,
    pub found_at: DateTime<Utc>,
}
