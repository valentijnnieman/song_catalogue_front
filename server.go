package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.Handle("/dist", http.FileServer(http.Dir("./dist")))
	http.Handle("/", http.FileServer(http.Dir("./")))
	fmt.Println("Listening and serving on port 3000")
	http.ListenAndServe(":3000", nil)
}
