package main

import (
	"birdogie-api/handlers"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, PATCH, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}

func main() {

	//TODO: Read from config to get DB cred
	dsn := "host=localhost user=postgres password=mysecretpassword dbname=mydatabase port=5432"

	//CREATE DB INSTANCE
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	r := gin.Default()

	//CORS Middleware
	r.Use(CORS())

	//GET REQUESTS
	r.GET("/posts", handlers.GetPosts(db))
	r.GET("/post/:id", handlers.GetPost(db))
	r.GET("/comments/:id", handlers.GetComments(db))

	//POST REQUESTS
	r.POST("/post", handlers.CreatePost(db))
	r.POST("/comment", handlers.CreateComment(db))

	//UPDATE REQUESTS
	// r.PUT("/post")
	// r.PUT("/comment")

	//PATCH REQUESTS
	//TODO: Move upvote/downvote to a MQ system
	r.PATCH("/posts/addVote/:id", handlers.AddVote(db))
	r.PATCH("/posts/removeVote/:id", handlers.RemoveVote(db))

	r.Run() // listen and serve on 0.0.0.0:8080

}
