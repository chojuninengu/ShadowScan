// src/db/scan_repo.rs

use crate::models::scan::{Scan, ScanResult};
use sqlx::{PgPool, Row};
use uuid::Uuid;

pub async fn create_scan(pool: &PgPool, user_id: Uuid) -> Result<Scan, sqlx::Error> {
    let row = sqlx::query("INSERT INTO scans (user_id) VALUES ($1) RETURNING *")
        .bind(user_id)
        .fetch_one(pool)
        .await?;

    let scan = Scan {
        id: row.get("id"),
        user_id: row.get("user_id"),
        status: row.get("status"),
        created_at: row.get("created_at"),
        updated_at: row.get("updated_at"),
    };
    Ok(scan)
}

pub async fn update_scan_status(
    pool: &PgPool,
    scan_id: Uuid,
    status: &str,
) -> Result<(), sqlx::Error> {
    sqlx::query("UPDATE scans SET status = $1 WHERE id = $2")
        .bind(status)
        .bind(scan_id)
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
    let row = sqlx::query(
        r#"
        INSERT INTO scan_results (scan_id, finding_type, details, risk_level, source_link)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, scan_id, finding_type, details, risk_level, source_link, found_at
        "#
    )
    .bind(scan_id)
    .bind(finding_type)
    .bind(details)
    .bind(risk_level)
    .bind(source_link)
    .fetch_one(pool)
    .await?;

    let result = ScanResult {
        id: row.get("id"),
        scan_id: row.get("scan_id"),
        finding_type: row.get("finding_type"),
        details: row.get("details"),
        risk_level: row.get("risk_level"),
        source_link: row.get("source_link"),
        found_at: row.get("found_at"),
    };
    Ok(result)
}

pub async fn get_scans_by_user(pool: &PgPool, user_id: Uuid) -> Result<Vec<Scan>, sqlx::Error> {
    let rows = sqlx::query("SELECT * FROM scans WHERE user_id = $1")
        .bind(user_id)
        .fetch_all(pool)
        .await?;

    let scans = rows.into_iter().map(|row| Scan {
        id: row.get("id"),
        user_id: row.get("user_id"),
        status: row.get("status"),
        created_at: row.get("created_at"),
        updated_at: row.get("updated_at"),
    }).collect();
    Ok(scans)
}

pub async fn get_scan_results_by_scan(
    pool: &PgPool,
    scan_id: Uuid,
) -> Result<Vec<ScanResult>, sqlx::Error> {
    let rows = sqlx::query(
        r#"
        SELECT id, scan_id, finding_type, details, risk_level, source_link, found_at
        FROM scan_results
        WHERE scan_id = $1
        "#
    )
    .bind(scan_id)
    .fetch_all(pool)
    .await?;

    let results = rows.into_iter().map(|row| ScanResult {
        id: row.get("id"),
        scan_id: row.get("scan_id"),
        finding_type: row.get("finding_type"),
        details: row.get("details"),
        risk_level: row.get("risk_level"),
        source_link: row.get("source_link"),
        found_at: row.get("found_at"),
    }).collect();
    Ok(results)
}
