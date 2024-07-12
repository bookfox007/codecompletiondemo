package router

import (
    "github.com/gorilla/mux"
    "go_rest_api/handlers"
)

func InitializeRouter() *mux.Router {
    r := mux.NewRouter()
    r.HandleFunc("/users", handlers.GetUsers).Methods("GET")
    r.HandleFunc("/user/{id}", handlers.GetUser).Methods("GET")
    r.HandleFunc("/user", handlers.CreateUser).Methods("POST")
    r.HandleFunc("/user/{id}", handlers.UpdateUser).Methods("PUT")
    r.HandleFunc("/user/{id}", handlers.DeleteUser).Methods("DELETE")
    return r
}
