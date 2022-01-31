package views

import (
	"net/http"
	"strings"

	"github.com/uadmin/uadmin"
)

func TicketingHandler(w http.ResponseWriter, r *http.Request) {
	session := r.FormValue("session")
	if session != "" {
		http.SetCookie(w, &http.Cookie{
			Name:  "session",
			Value: session,
			Path:  "/",
		})
	}

	// Checks if user is not authenticated
	// and redirect it to login page.
	sess := uadmin.IsAuthenticated(r)
	if sess == nil {
		http.Redirect(w, r, "/", 303)
		return
	}

	r.URL.Path = strings.TrimPrefix(r.URL.Path, "/ticketing/")
	page := strings.TrimSuffix(r.URL.Path, "/")
	context := map[string]interface{}{}

	switch page {
	case "dashboard":
		context = Dashboard(w, r)
	}

	context["Page"] = strings.Title(page)
	TicketRender(w, r, page, context)
}

func TicketRender(w http.ResponseWriter, r *http.Request, tpl string, context map[string]interface{}) {
	var username string
	if uadmin.GetUserFromRequest(r).String() != "" {
		username = uadmin.GetUserFromRequest(r).String()
	} else {
		username = uadmin.GetUserFromRequest(r).Username
	}

	context["Username"] = username

	templateList := []string{}
	templateList = append(templateList, "./templates/ticketing/base.html")

	path := "./templates/ticketing/" + tpl + ".html"
	templateList = append(templateList, path)

	uadmin.RenderMultiHTML(w, r, templateList, context)
}
