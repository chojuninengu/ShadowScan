// src/auth/jwt.rs

use jsonwebtoken::{encode, Header, EncodingKey};
use serde::{Deserialize, Serialize};
use std::env;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String, // Subject (user id)
    pub exp: usize,  // Expiration time
}

pub fn create_jwt(user_id: &str) -> Result<String, jsonwebtoken::errors::Error> {
    let expiration = chrono::Utc::now()
        .checked_add_signed(chrono::Duration::hours(24))
        .expect("valid timestamp")
        .timestamp();

    let claims = Claims {
        sub: user_id.to_owned(),
        exp: expiration as usize,
    };

    let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
    encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_ref()))
}
