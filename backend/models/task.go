package models

import (
	"time"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Task struct {
	
	ID        uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	Title     string    `gorm:"not null" json:"title"`
	Completed bool      `gorm:"default:false" json:"completed"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}


func (task *Task) BeforeCreate(tx *gorm.DB) (err error) {
	task.ID = uuid.New()
	return
}