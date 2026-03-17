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

func UpdateTask(c *gin.Context){
	var task models.Task

	if err := config.DB.Where("id = ?", c.Param("id")).First(&task).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Task gak ketemu bro!"})
		return
	}

	var input models.Task
	if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
	}

	task.Title = input.Title
	task.Completed = input.Completed
	config.DB.Save(&task)

	c.JSON(http.StatusOK, gin.H{"data": task})

}

func DeleteTask(c *gin.Context){
	var task models.Task

	if err := config.DB.Where("id = ?", c.Param("id")).First(&task).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Task Nggak ketemu Bro!"})
		return
	}

	config.DB.Delete(&task)

	c.JSON(http.StatusOK, gin.H{"message": "Task berhasil dihapus"})
}


	