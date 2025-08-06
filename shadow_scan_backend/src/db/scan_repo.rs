// src/db/scan_repo.rs

use crate::models::scan::{Scan, ScanResult};
use sqlx::PgPool;
use uuid::Uuid;

pub async fn create_scan(pool: &PgPool, user_id: Uuid) -> Result<Scan, sqlx::Error> {
    let scan = sqlx::query_as!(
        Scan,
        "INSERT INTO scans (user_id) VALUES ($1) RETURNING *",
        user_id
    )
    .fetch_one(pool)
    .await?;
    Ok(scan)
}

pub async fn update_scan_status(
    pool: &PgPool,
    scan_id: Uuid,
    status: &str,
) -> Result<(), sqlx::Error> {
    sqlx::query!("UPDATE scans SET status = $1 WHERE id = $2", status, scan_id)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn create_scan_result(
    pool: &PgPool,
    scan_id: Uuid,
    finding_type: &str,
    details: serde_json::Value,
    risk_level: &str,
    source_link: Option<&str>,
) -> Result<ScanResult, sqlx::Error> {
    let result = sqlx::query_as!(
        ScanResult,
        r#"
        INSERT INTO scan_results (scan_id, finding_type, details, risk_level, source_link)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, scan_id, finding_type, details, risk_level, source_link, found_at
        "#,
        scan_id,
        finding_type,
        details,
        risk_level,
        source_link
    )
    .fetch_one(pool)
    .await?;
    Ok(result)
}

pub async fn get_scans_by_user(pool: &PgPool, user_id: Uuid) -> Result<Vec<Scan>, sqlx::Error> {
    let scans = sqlx::query_as!(Scan, "SELECT * FROM scans WHERE user_id = $1", user_id)
        .fetch_all(pool)
        .await?;
    Ok(scans)
}

pub async fn get_scan_results_by_scan(
    pool: &PgPool,
    scan_id: Uuid,
) -> Result<Vec<ScanResult>, sqlx::Error> {
    let results = sqlx::query_as!(
        ScanResult,
        r#"
        SELECT id, scan_id, finding_type, details, risk_level, source_link, found_at
        FROM scan_results
        WHERE scan_id = $1
        "#,
        scan_id
    )
    .fetch_all(pool)
    .await?;
    Ok(results)
}
