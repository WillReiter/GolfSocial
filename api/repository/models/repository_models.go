package repository_models

type Post struct {
	ID        int    `gorm:"id"`
	Title     string `gorm:"title"`
	Content   string `gorm:"content"`
	Upvotes   int    `gorm:"upvotes"`
	Downvotes int    `gorm:"downvotes"`
	Poster    string `gorm:"poster"`
}
