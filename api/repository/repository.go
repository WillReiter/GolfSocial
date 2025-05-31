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

func CreatePost(db *gorm.DB, postData repository_models.Post) error {

	result := db.Table("birdogie.posts").Create(&postData)
	if result.Error != nil {
		return fmt.Errorf("DB ERROR: %s", result.Error)
	}
	return nil

}

func AddUpvote(db *gorm.DB, id int) error {

	var post repository_models.Post
	if err := db.Table("birdogie.posts").Where("id = ?", id).Take(&post).Error; err != nil {
		return err
	}
	if err := db.Table("birdogie.posts").Model(&post).Update("upvotes", post.Upvotes+1).Error; err != nil {
		return err
	}
	return nil
}

func RemoveUpvote(db *gorm.DB, id int) error {

	var post repository_models.Post
	if err := db.Table("birdogie.posts").Where("id = ?", id).Take(&post).Error; err != nil {
		return err
	}
	if post.Upvotes <= 0 {
		return fmt.Errorf("too few upvotes to decrement! Upvote count: %d", post.Upvotes)
	}
	if err := db.Table("birdogie.posts").Model(&post).Update("upvotes", post.Upvotes-1).Error; err != nil {
		return err
	}
	return nil
}

func AddDownvote(db *gorm.DB, id int) error {

	var post repository_models.Post
	if err := db.Table("birdogie.posts").Where("id = ?", id).Take(&post).Error; err != nil {
		return err
	}
	if err := db.Table("birdogie.posts").Model(&post).Update("downvotes", post.Downvotes+1).Error; err != nil {
		return err
	}
	return nil
}

func RemoveDownvote(db *gorm.DB, id int) error {

	var post repository_models.Post
	if err := db.Table("birdogie.posts").Where("id = ?", id).Take(&post).Error; err != nil {
		return err
	}
	if post.Downvotes <= 0 {
		return fmt.Errorf("too few downvotes to decrement! Downvote count: %d", post.Downvotes)
	}
	if err := db.Table("birdogie.posts").Model(&post).Update("downvotes", post.Downvotes-1).Error; err != nil {
		return err
	}
	return nil
}
