// src/db/feedback_repo.rs

use crate::models::feedback::Feedback;
use sqlx::PgPool;
use uuid::Uuid;

pub async fn create_feedback(
    pool: &PgPool,
    user_id: Option<Uuid>,
    message: &str,
    is_false_positive: bool,
    related_result_id: Option<Uuid>,
) -> Result<Feedback, sqlx::Error> {
    let feedback = sqlx::query_as!(
        Feedback,
        r#"
        INSERT INTO feedback (user_id, message, is_false_positive, related_result_id)
        VALUES ($1, $2, $3, $4)
        RETURNING id, user_id, message, is_false_positive, related_result_id, created_at
        "#,
        user_id,
        message,
        is_false_positive,
        related_result_id,
    )
    .fetch_one(pool)
    .await?;

    Ok(feedback)
}
