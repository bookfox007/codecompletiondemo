
use crate::models::user::{CreateUser, User};
use crate::db::create_pool;
use crate::error::ApiError;
use hyper::{Body, Response};
use serde_json::json;
use sqlx::PgPool;

pub async fn create_user(
    pool: &PgPool,
    create_user: CreateUser,
) -> Result<Response<Body>, ApiError> {
    let user = sqlx::query_as!(
        User,
        r#"
        INSERT INTO users (name, email)
        VALUES ($1, $2)
        RETURNING id, name, email
        "#,
        create_user.name,
        create_user.email
    )
    .fetch_one(pool)
    .await?;

    let json_response = serde_json::to_string(&user)?;
    Ok(Response::new(Body::from(json_response)))
}

pub async fn get_users(pool: &PgPool) -> Result<Response<Body>, ApiError> {
    let users = sqlx::query_as!(
        User,
        r#"
        SELECT id, name, email
        FROM users
        "#
    )
    .fetch_all(pool)
    .await?;

    let json_response = serde_json::to_string(&users)?;
    Ok(Response::new(Body::from(json_response)))
}
