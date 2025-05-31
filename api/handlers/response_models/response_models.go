package responsemodels

type Post struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Content   string `json:"content"`
	Upvotes   int    `json:"upvotes"`
	Downvotes int    `json:"downvotes"`
	Poster    string `json:"poster"`
}
