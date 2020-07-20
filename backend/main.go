package main

import (
	"SnippetsAPI/router"
	"SnippetsAPI/shared"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

func main() {
	// init the mux router
	r := mux.NewRouter()

	// setup router manager
	snippetsRouter := &router.SnippetRouter{
		Name:    "Snippet Router",
		Version: "v0.0.1",
	}

	// register the routes
	r.HandleFunc("/", snippetsRouter.BaseHandler)

	// create the http server
	server := &http.Server{
		Handler:      r,
		Addr:         fmt.Sprintf("127.0.0.1:%d", shared.ServerPort),
		WriteTimeout: 30 * time.Second,
		ReadTimeout:  30 * time.Second,
	}

	// log and serve the server
	fmt.Println(fmt.Sprintf("Starting snippets server on port %d...", shared.ServerPort))
	log.Fatal(server.ListenAndServe())
}
