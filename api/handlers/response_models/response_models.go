package responsemodels

type Post struct {
	ID           int    `json:"id"`
	Title        string `json:"title"`
	Content      string `json:"content"`
	Upvotes      int    `json:"upvotes"`
	Downvotes    int    `json:"downvotes"`
	CommentCount int    `json:"commentCount"`
	//Should be an int, just rolling w it because of test data :(
	UserID string `json:"userId"`
}

type PostWithComments struct {
	ID        int       `json:"id"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	Upvotes   int       `json:"upvotes"`
	Downvotes int       `json:"downvotes"`
	Comment   []Comment `json:"comments"`
	//Should be an int, just rolling w it because of test data :(
	UserID string `json:"userId"`
}

type Comment struct {
	ID        int    `json:"id"`
	PostID    int    `json:"post_id"`
	Content   string `json:"content"`
	Upvotes   int    `json:"upvotes"`
	Downvotes int    `json:"downvotes"`
	//Should be an int, just rolling w it because of test data :(
	UserID string `json:"user_id"`
}
