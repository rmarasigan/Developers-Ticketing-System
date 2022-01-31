package views

import (
	"net/http"
)

func Dashboard(w http.ResponseWriter, r *http.Request) map[string]interface{} {
	// username := uadmin.IsAuthenticated(r).User.Username

	context := map[string]interface{}{}

	return context
}
