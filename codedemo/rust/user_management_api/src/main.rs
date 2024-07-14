
mod config;
mod db;
mod error;
mod handlers;
mod models;
mod routes;

use config::Config;
use db::create_pool;
use hyper::service::{make_service_fn, service_fn};
use hyper::{Body, Request, Response, Server};
use routes::user::user_routes;
use std::convert::Infallible;
use std::net::SocketAddr;
use sqlx::PgPool;

async fn handle_request(
    req: Request<Body>,
    pool: PgPool,
) -> Result<Response<Body>, Infallible> {
    match user_routes(req, pool).await {
        Ok(response) => Ok(response),
        Err(err) => {
            let mut response = Response::new(Body::from(err.to_string()));
            *response.status_mut() = err.status_code();
            Ok(response)
        }
    }
}

#[tokio::main]
async fn main() {
    let config = Config::from_env();
    let pool = create_pool(&config.database_url).await;

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));

    let make_svc = make_service_fn(move |_conn| {
        let pool = pool.clone();
        async move {
            Ok::<_, Infallible>(service_fn(move |req| {
                let pool = pool.clone();
                handle_request(req, pool)
            }))
        }
    });

    let server = Server::bind(&addr).serve(make_svc);

    println!("Listening on http://{}", addr);
    if let Err(e) = server.await {
        eprintln!("server error: {}", e);
    }
}
            