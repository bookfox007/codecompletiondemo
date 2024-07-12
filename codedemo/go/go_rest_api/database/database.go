package database

import (
    "log"

    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
    "go_rest_api/models"
)

var DB *gorm.DB

func InitDB() {
    var err error
    DB, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
    if err != nil {
        log.Fatal("Failed to connect to database!")
    }

    DB.AutoMigrate(&models.User{})
}
