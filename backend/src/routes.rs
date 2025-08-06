// src/routes.rs

use crate::{
    app_state::AppState,
    auth,
    handlers::{feedback, health, scan},
};
use axum::{
    middleware,
    routing::{get, post},
    Router,
};

pub fn create_router(app_state: AppState) -> Router {
    // Routes that require authentication
    let protected_routes = Router::new()
        .route("/api/scan", post(scan::start_scan))
        .route("/api/results/:user_id", get(scan::get_scan_results))
        .route_layer(middleware::from_fn_with_state(
            app_state.clone(),
            auth::middleware::auth,
        ));

    // Public routes
    Router::new()
        .route("/api/health", get(health::health_check))
        .route("/api/register", post(auth::handler::register))
        .route("/api/login", post(auth::handler::login))
        .route("/api/feedback", post(feedback::submit_feedback))
        .merge(protected_routes)
        .with_state(app_state)
}
