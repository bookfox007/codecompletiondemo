package main

import (
    "log"
    "net/http"

    "go_rest_api/router"
    "go_rest_api/database"
)

func main() {
    database.InitDB()
    r := router.InitializeRouter()
    log.Println("Server starting at http://localhost:8000")
    log.Fatal(http.ListenAndServe(":8000", r))
}
