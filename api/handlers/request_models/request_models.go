package requestmodels

type Post struct {
	Title   string `json:"title"`
	Content string `json:"content"`
	//Should be an int, just rolling w it because of test data :(
	UserID int `json:"userID"`
}

type Comment struct {
	Content string `json:"content"`
	PostID  int    `json:"postID"`
	//Should be an int, just rolling w it because of test data :(
	UserID int `json:"userID"`
}
