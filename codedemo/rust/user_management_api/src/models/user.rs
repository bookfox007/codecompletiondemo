
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct User {
    pub id: i32,
    pub name: String,
    pub email: String,
}

#[derive(Deserialize)]
pub struct CreateUser {
    pub name: String,
    pub email: String,
}

                