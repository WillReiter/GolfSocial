package responsemodels

type Post struct {
	ID           int    `json:"id"`
	Title        string `json:"title"`
	Content      string `json:"content"`
	Votes        int    `json:"votes"`
	CommentCount int    `json:"commentCount"`
	UserID       int    `json:"userId"`
}

type PostWithComments struct {
	ID      int       `json:"id"`
	Title   string    `json:"title"`
	Content string    `json:"content"`
	Votes   int       `json:"votes"`
	Comment []Comment `json:"comments"`
	UserID  int       `json:"userId"`
}

type Comment struct {
	ID      int    `json:"id"`
	PostID  int    `json:"post_id"`
	Content string `json:"content"`
	Votes   int    `json:"votes"`
	UserID  int    `json:"user_id"`
}
