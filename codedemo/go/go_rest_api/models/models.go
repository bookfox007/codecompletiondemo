package models

type User struct {
    ID       uint   `json:"id" gorm:"primary_key"`
    Name     string `json:"name"`
    Email    string `json:"email"`
    Password string `json:"password"`
    //增加token
    Token    string `json:"token,omitempty" gorm:"-"`
}

//创建role对象
type Role struct {
    ID   uint   `json:"id" gorm:"primary_key"`
    Name string `json:"name"`
}

