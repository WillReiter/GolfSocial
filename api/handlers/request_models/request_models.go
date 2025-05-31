package requestmodels

type Post struct {
	Title   string `json:"title"`
	Content string `json:"content"`
	Poster  string `json:"poster"`
}
