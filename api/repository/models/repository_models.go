package repository_models

type Post struct {
	ID      int    `gorm:"id"`
	Title   string `gorm:"title"`
	Content string `gorm:"content"`
	Votes   int    `gorm:"votes"`
	UserID  int    `gorm:"user_id"`
}

type Comment struct {
	ID      int    `gorm:"id"`
	PostID  int    `gorm:"post_id"`
	Content string `gorm:"content"`
	Votes   int    `gorm:"votes"`
	UserID  int    `gorm:"user_id"`
}
