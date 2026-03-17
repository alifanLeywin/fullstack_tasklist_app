package controllers

import(
	"net/http"
	"tasklist-backend/config"
	"tasklist-backend/models"

	"github.com/gin-gonic/gin"
)

func GetTasks(c *gin.Context){
	var tasks []models.Task

	config.DB.Find(&tasks)

	c.JSON(http.StatusOK, gin.H{"data": tasks})
}

func CreateTask(c *gin.Context){
	var input models.Task

	if err := c.ShouldBindJSON(&input); err != nil {
		      c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		      return
	}

	config.DB.Create(&input)

	c.JSON(http.StatusOK, gin.H{"data": input})
}


	