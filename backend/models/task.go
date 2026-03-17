package models

import "time"

type Task struct {
		ID			uint      `gorm:"primaryKey"`
		Title		string	  `gorm:"not null" json:"title"`
		Completed	bool	  `gorm:"default:false" json:"completed"`
		CreatedAt	time.Time `json:"created_at"`
		UpdatedAt	time.Time `json:"updated_at"`

}