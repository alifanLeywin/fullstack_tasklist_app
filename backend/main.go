package main

import(
	"tasklist-backend/config"
	"tasklist-backend/models"
	"tasklist-backend/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main(){

	config.ConnectDatabase()

	config.DB.AutoMigrate(&models.Task{})

	r := gin.Default()

	r.Use(cors.Default())

	routes.SetupRoutes(r)
	r.Run()
}