package repository

import (
	repository_models "birdogie-api/repository/models"
	"fmt"

	"gorm.io/gorm"
)

func GetPosts(db *gorm.DB) ([]repository_models.Post, error) {
	var posts []repository_models.Post
	result := db.Table("birdogie.posts").Order("id DESC").Find(&posts)
	if result.Error != nil {
		return nil, fmt.Errorf("DB ERROR: %s", result.Error)
	}

	return posts, nil
}

func GetPost(db *gorm.DB, id int) (*repository_models.Post, error) {
	var post repository_models.Post
	result := db.Table("birdogie.posts").Where("id = ?", id).Take(&post)
	if result.Error != nil {
		return nil, fmt.Errorf("DB ERROR: %s", result.Error)
	}

	return &post, nil
}

func GetComments(db *gorm.DB, id int) ([]repository_models.Comment, error) {
	var comments []repository_models.Comment
	result := db.Table("birdogie.comments").Where("post_id = ?", id).Find(&comments)
	if result.Error != nil {
		return nil, fmt.Errorf("DB ERROR: %s", result.Error)
	}
	return comments, nil
}

func CreatePost(db *gorm.DB, postData repository_models.Post) error {

	result := db.Table("birdogie.posts").Create(&postData)
	if result.Error != nil {
		return fmt.Errorf("DB ERROR: %s", result.Error)
	}
	return nil
}

func CreateComment(db *gorm.DB, commentData repository_models.Comment) error {
	result := db.Table("birdogie.comments").Create(&commentData)
	if result.Error != nil {
		return fmt.Errorf("DB ERROR: %s", result.Error)
	}
	return nil
}

func AddVote(db *gorm.DB, id int) error {

	var post repository_models.Post
	if err := db.Table("birdogie.posts").Where("id = ?", id).Take(&post).Error; err != nil {
		return err
	}
	if err := db.Table("birdogie.posts").Model(&post).Update("votes", post.Votes+1).Error; err != nil {
		return err
	}
	return nil
}

func RemoveVote(db *gorm.DB, id int) error {

	var post repository_models.Post
	if err := db.Table("birdogie.posts").Where("id = ?", id).Take(&post).Error; err != nil {
		return err
	}
	if err := db.Table("birdogie.posts").Model(&post).Update("votes", post.Votes-1).Error; err != nil {
		return err
	}
	return nil
}
