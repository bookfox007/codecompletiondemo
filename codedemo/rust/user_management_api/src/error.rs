
use hyper::http::StatusCode;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ApiError {
    #[error("Database error")]
    DbError(#[from] sqlx::Error),

    #[error("Invalid request")]
    InvalidRequest,
}

impl ApiError {
    pub fn status_code(&self) -> StatusCode {
        match self {
            ApiError::DbError(_) => StatusCode::INTERNAL_SERVER_ERROR,
            ApiError::InvalidRequest => StatusCode::BAD_REQUEST,
        }
    }
}
            