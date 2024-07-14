
use crate::handlers::user::{create_user, get_users,update_user,delete_user};
use crate::db::create_pool;
use crate::error::ApiError;
use crate::models::user::{CreateUser,UpdateUser,DeleteUser};
use hyper::{Body, Request, Response};
use sqlx::PgPool;

pub async fn user_routes(req: Request<Body>, pool: PgPool) -> Result<Response<Body>, ApiError> {
    match (req.method(), req.uri().path()) {
        (&hyper::Method::POST, "/users") => {
            let whole_body = hyper::body::to_bytes(req.into_body()).await?;
            let create_user: CreateUser = serde_json::from_slice(&whole_body)?;
            create_user(&pool, create_user).await
        }
        (&hyper::Method::GET, "/users") => get_users(&pool).await,
        _ => Ok(Response::new(Body::from("Not Found"))),

      
        (&hyper::Method::PUT, "/users") => {
            let whole_body = hyper::body::to_bytes(req.into_body()).await?;
            let update_user: UpdateUser = serde_json::from_slice(&whole_body)?;
            update_user(&pool, update_user).await
        }
        (&hyper::Method::DELETE, "/users") => {
            let whole_body = hyper::body::to_bytes(req.into_body()).await?;
            let delete_user: DeleteUser = serde_json::from_slice(&whole_body)?;
            delete_user(&pool, delete_user).await
        }
        _ => Ok(Response::new(Body::from("Not Found"))),
    
    }
}
                