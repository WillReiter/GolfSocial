package handlers

import (
	requestmodels "birdogie-api/handlers/request_models"
	responsemodels "birdogie-api/handlers/response_models"
	"birdogie-api/repository"
	repository_models "birdogie-api/repository/models"
	"fmt"
	"log"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetPosts(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		var posts []responsemodels.Post

		//Call Repository and get the data from db
		result, err := repository.GetPosts(db)
		if err != nil {
			// fmt.Errorf("%s", err)
			c.JSON(500, "Error getting data.")
			return
		}

		for _, item := range result {
			post := responsemodels.Post{
				ID:        item.ID,
				Title:     item.Title,
				Content:   item.Content,
				Upvotes:   item.Upvotes,
				Downvotes: item.Downvotes,
				Poster:    item.Poster,
			}
			posts = append(posts, post)
		}

		c.JSON(200, posts)
	}

}

func CreatePost(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		var requestData requestmodels.Post

		err := c.BindJSON(&requestData)
		if err != nil {
			c.JSON(400, gin.H{"message": "Invalid Request Body"})
			return
		}

		post := repository_models.Post{
			Title:   requestData.Title,
			Content: requestData.Content,
			Poster:  requestData.Poster,
		}

		err = repository.CreatePost(db, post)
		if err != nil {
			c.JSON(500, "Error Inserting Data")
			return
		}

		// log.Printf("Post from message body: %v", post)

		c.JSON(201, "Post successfully created.")
	}
}

func AddUpvote(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")

		idInt, err := strconv.Atoi(id)
		if err != nil || id == "" || idInt < 0 {
			c.JSON(400, gin.H{"message: ": fmt.Sprintf("Invalid id provided `%s`. Should be a integer greater than or equal to zero.", id)})
			return
		}

		err = repository.AddUpvote(db, idInt)
		if err != nil {
			c.JSON(500, gin.H{"message": fmt.Sprintf("Error adding upvote to post with id `%d`", idInt)})
			return
		}

		c.JSON(200, gin.H{"message: ": fmt.Sprintf("Successfully added upvote to post with id `%d`", idInt)})
	}
}

func RemoveUpvote(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")

		idInt, err := strconv.Atoi(id)
		if err != nil || id == "" || idInt < 0 {
			c.JSON(400, gin.H{"message: ": fmt.Sprintf("Invalid id provided `%s`. Should be a integer greater than or equal to zero.", id)})
			return
		}

		//The better way of doing this is to get check for invalid decrement in the handler before actually doing the decrement for handling erros properly
		//Reason for this is because we shouldn't throw a 500 error when we try to decrement a count <= 0.
		err = repository.RemoveUpvote(db, idInt)
		if err != nil {
			log.Printf("ERROR: %s", err.Error())
			c.JSON(500, gin.H{"message": fmt.Sprintf("Error removing upvote to post with id `%d`", idInt)})
			return
		}

		c.JSON(200, gin.H{"message: ": fmt.Sprintf("Successfully removed upvote to post with id `%d`", idInt)})
	}
}

func AddDownvote(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")

		idInt, err := strconv.Atoi(id)
		if err != nil || id == "" || idInt < 0 {
			c.JSON(400, gin.H{"message: ": fmt.Sprintf("Invalid id provided `%s`. Should be a integer greater than or equal to zero.", id)})
			return
		}

		err = repository.AddDownvote(db, idInt)
		if err != nil {
			c.JSON(500, gin.H{"message": fmt.Sprintf("Error adding downvote to post with id `%d`", idInt)})
			return
		}

		c.JSON(200, gin.H{"message: ": fmt.Sprintf("Successfully added downvote to post with id `%d`", idInt)})
	}
}

func RemoveDownvote(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")

		idInt, err := strconv.Atoi(id)
		if err != nil || id == "" || idInt < 0 {
			c.JSON(400, gin.H{"message: ": fmt.Sprintf("Invalid id provided `%s`. Should be a integer greater than or equal to zero.", id)})
			return
		}

		//The better way of doing this is to get check for invalid decrement in the handler before actually doing the decrement for handling erros properly
		//Reason for this is because we shouldn't throw a 500 error when we try to decrement a count <= 0.
		err = repository.RemoveDownvote(db, idInt)
		if err != nil {
			log.Printf("ERROR: %s", err.Error())
			c.JSON(500, gin.H{"message": fmt.Sprintf("Error removing downvote to post with id `%d`", idInt)})
			return
		}

		c.JSON(200, gin.H{"message: ": fmt.Sprintf("Successfully removed downvote to post with id `%d`", idInt)})
	}
}
