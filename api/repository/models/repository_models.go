package repository_models

type Post struct {
	ID        int    `gorm:"id"`
	Title     string `gorm:"title"`
	Content   string `gorm:"content"`
	Upvotes   int    `gorm:"upvotes"`
	Downvotes int    `gorm:"downvotes"`
	// TODO MAKE THIS A INT IN SCHEMA
	// UserID is only a string because the sample data GPT generated made it a varchar instead of a integer.
	UserID string `gorm:"user_id"`
}

// id SERIAL, post_id INTEGER, content VARCHAR (1024), upvotes INTEGER, downvotes INTEGER, user_id VARCHAR
type Comment struct {
	ID        int    `gorm:"id"`
	PostID    int    `gorm:"post_id"`
	Content   string `gorm:"content"`
	Upvotes   int    `gorm:"upvotes"`
	Downvotes int    `gorm:"downvotes"`
	// TODO MAKE THIS A INT IN SCHEMA
	// UserID is only a string because the sample data GPT generated made it a varchar instead of a integer.
	UserID string `gorm:"user_id"`
}
