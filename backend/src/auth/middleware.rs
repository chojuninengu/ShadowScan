// src/auth/middleware.rs

use axum::{
    extract::State,
    http::{header, Request},
    middleware::Next,
    response::Response,
};
use jsonwebtoken::{decode, Validation, DecodingKey};
use std::env;
use crate::{app_state::AppState, auth::jwt::Claims, errors::AppError};
use axum::body::Body;

pub async fn auth(
    State(_state): State<AppState>,
    mut req: Request<Body>,
    next: Next,
) -> Result<Response, AppError> {
    let token = req.headers()
        .get(header::AUTHORIZATION)
        .and_then(|auth_header| auth_header.to_str().ok())
        .and_then(|auth_value| {
            if auth_value.starts_with("Bearer ") {
                Some(auth_value[7..].to_owned())
            } else {
                None
            }
        });

    let token = token.ok_or_else(|| AppError::BadRequest("Missing token".to_string()))?;

    let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
    let claims = decode::<Claims>(&token, &DecodingKey::from_secret(secret.as_ref()), &Validation::default())
        .map_err(|_| AppError::BadRequest("Invalid token".to_string()))?
        .claims;

    req.extensions_mut().insert(claims.sub);

    Ok(next.run(req).await)
}
