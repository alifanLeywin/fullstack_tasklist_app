package routes

import(
	"tasklist-backend/controllers"

	"github.com/gin-gonic/gin"

)

func SetupRoutes(r *gin.Engine){

	api := r.Group("/api")
	{
		api.GET("/tasks", controllers.GetTasks)
		api.POST("/tasks", controllers.CreateTask)
		api.PATCH("/tasks/:id", controllers.UpdateTask)
		api.DELETE("/tasks/:id", controllers.DeleteTask)
	}

}