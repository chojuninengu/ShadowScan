// src/auth/handler.rs

use crate::{
    app_state::AppState,
    auth::{jwt, password},
    db::user_repo,
    errors::AppError,
};
use axum::{extract::State, http::StatusCode, Json};
use serde::{Deserialize, Serialize};
use validator::Validate;

#[derive(Deserialize, Validate)]
pub struct RegisterRequest {
    #[validate(length(min = 3, message = "Username must be at least 3 characters long"))]
    pub username: String,
    #[validate(email(message = "Invalid email format"))]
    pub email: String,
    #[validate(length(min = 8, message = "Password must be at least 8 characters long"))]
    pub password: String,
}

#[derive(Deserialize, Validate)]
pub struct LoginRequest {
    #[validate(email(message = "Invalid email format"))]
    pub email: String,
    #[validate(length(min = 8, message = "Password must be at least 8 characters long"))]
    pub password: String,
}

#[derive(Serialize)]
pub struct AuthResponse {
    pub token: String,
}

pub async fn register(
    State(state): State<AppState>,
    Json(payload): Json<RegisterRequest>,
) -> Result<(StatusCode, Json<AuthResponse>), AppError> {
    if let Err(e) = payload.validate() {
        return Err(AppError::BadRequest(e.to_string()));
    }

    // Check if user already exists
    if user_repo::find_user_by_email(&state.db_pool, &payload.email)
        .await
        .map_err(|_| AppError::InternalServerError)?
        .is_some()
    {
        return Err(AppError::BadRequest("User with this email already exists".to_string()));
    }
    if user_repo::find_user_by_username(&state.db_pool, &payload.username)
        .await
        .map_err(|_| AppError::InternalServerError)?
        .is_some()
    {
        return Err(AppError::BadRequest("Username is already taken".to_string()));
    }

    let password_hash = password::hash_password(&payload.password)
        .map_err(|_| AppError::InternalServerError)?;

    let new_user = user_repo::create_user(
        &state.db_pool,
        &payload.username,
        &payload.email,
        &password_hash,
    )
    .await
    .map_err(|_| AppError::InternalServerError)?;

    let token =
        jwt::create_jwt(&new_user.id.to_string()).map_err(|_| AppError::InternalServerError)?;

    Ok((
        StatusCode::CREATED,
        Json(AuthResponse { token }),
    ))
}

pub async fn login(
    State(state): State<AppState>,
    Json(payload): Json<LoginRequest>,
) -> Result<(StatusCode, Json<AuthResponse>), AppError> {
    if let Err(e) = payload.validate() {
        return Err(AppError::BadRequest(e.to_string()));
    }

    let user = user_repo::find_user_by_email(&state.db_pool, &payload.email)
        .await
        .map_err(|_| AppError::InternalServerError)?
        .ok_or_else(|| AppError::BadRequest("Invalid email or password".to_string()))?;

    let is_valid_password = password::verify_password(&payload.password, &user.password_hash)
        .map_err(|_| AppError::InternalServerError)?;

    if !is_valid_password {
        return Err(AppError::BadRequest("Invalid email or password".to_string()));
    }

    let token = jwt::create_jwt(&user.id.to_string()).map_err(|_| AppError::InternalServerError)?;

    Ok((StatusCode::OK, Json(AuthResponse { token })))
}
