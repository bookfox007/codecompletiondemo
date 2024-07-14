
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

//增加更新用户方法
pub async fn update_user(
    pool: &PgPool,
    user_id: i32,
    update_user: CreateUser,
) -> Result<Response<Body>, ApiError> {
    let user = sqlx::query_as!(
        User,
        r#"
        UPDATE users
        SET name = $1, email = $2
        WHERE id = $3
        RETURNING id, name, email
        "#,
        update_user.name,
        update_user.email,
        user_id
    )
    .fetch_one(pool)
    .await?;
    let json_response = serde_json::to_string(&user)?;
    Ok(Response::new(Body::from(json_response)))
}
//增加删除用户方法
pub async fn delete_user(
    pool: &PgPool,
    user_id: i32,
) -> Result<Response<Body>, ApiError> {
    let user = sqlx::query_as!(
        User,
        r#"
        DELETE FROM users
        WHERE id = $1
        RETURNING id, name, email
        "#,
        user_id
    )
    .fetch_one(pool)
    .await?;
    let json_response = serde_json::to_string(&user)?;
    Ok(Response::new(Body::from(json_response)))
}
