// src/db/feedback_repo.rs

use crate::models::feedback::Feedback;
use sqlx::{PgPool, Row};
use uuid::Uuid;

pub async fn create_feedback(
    pool: &PgPool,
    user_id: Option<Uuid>,
    message: &str,
    is_false_positive: bool,
    related_result_id: Option<Uuid>,
) -> Result<Feedback, sqlx::Error> {
    let row = sqlx::query(
        r#"
        INSERT INTO feedback (user_id, message, is_false_positive, related_result_id)
        VALUES ($1, $2, $3, $4)
        RETURNING id, user_id, message, is_false_positive, related_result_id, created_at
        "#
    )
    .bind(user_id)
    .bind(message)
    .bind(is_false_positive)
    .bind(related_result_id)
    .fetch_one(pool)
    .await?;

    let feedback = Feedback {
        id: row.get("id"),
        user_id: row.get("user_id"),
        message: row.get("message"),
        is_false_positive: row.get("is_false_positive"),
        created_at: row.get("created_at"),
    };

    Ok(feedback)
}
