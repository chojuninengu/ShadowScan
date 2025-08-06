// src/db/user_repo.rs

use crate::models::user::User;
use sqlx::{PgPool, Row};

pub async fn create_user(
    pool: &PgPool,
    username: &str,
    email: &str,
    password_hash: &str,
) -> Result<User, sqlx::Error> {
    let row = sqlx::query(
        "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *"
    )
    .bind(username)
    .bind(email)
    .bind(password_hash)
    .fetch_one(pool)
    .await?;

    let user = User {
        id: row.get("id"),
        username: row.get("username"),
        email: row.get("email"),
        password_hash: row.get("password_hash"),
        created_at: row.get("created_at"),
        updated_at: row.get("updated_at"),
    };

    Ok(user)
}

pub async fn find_user_by_email(pool: &PgPool, email: &str) -> Result<Option<User>, sqlx::Error> {
    let row = sqlx::query("SELECT * FROM users WHERE email = $1")
        .bind(email)
        .fetch_optional(pool)
        .await?;

    let user = row.map(|r| User {
        id: r.get("id"),
        username: r.get("username"),
        email: r.get("email"),
        password_hash: r.get("password_hash"),
        created_at: r.get("created_at"),
        updated_at: r.get("updated_at"),
    });

    Ok(user)
}

pub async fn find_user_by_username(
    pool: &PgPool,
    username: &str,
) -> Result<Option<User>, sqlx::Error> {
    let row = sqlx::query("SELECT * FROM users WHERE username = $1")
        .bind(username)
        .fetch_optional(pool)
        .await?;

    let user = row.map(|r| User {
        id: r.get("id"),
        username: r.get("username"),
        email: r.get("email"),
        password_hash: r.get("password_hash"),
        created_at: r.get("created_at"),
        updated_at: r.get("updated_at"),
    });

    Ok(user)
}
