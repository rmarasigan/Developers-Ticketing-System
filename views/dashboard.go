package views

import (
	"net/http"
	"strconv"

	"github.com/mark/developers_ticketing_system/models"
	"github.com/uadmin/uadmin"
)

func Dashboard(w http.ResponseWriter, r *http.Request) map[string]interface{} {
	// username := uadmin.IsAuthenticated(r).User.Username

	context := map[string]interface{}{}
	tickets := models.Ticket{}
	uadmin.Preload(&tickets)
	uadmin.Trail(uadmin.DEBUG, "TICKETS %v", tickets)

	if r.Method == "POST" {
		dataAction := r.FormValue("data-action")
		if dataAction == "save-ticket" {
			tickets.Name = r.FormValue("name")
			tickets.Description = r.FormValue("description")
			ticketsystem, _ := strconv.ParseInt(r.FormValue("system"), 10, 64)
			tickets.SystemID = uint(ticketsystem)
			ticketpriority, _ := strconv.ParseInt(r.FormValue("priority"), 10, 64)
			ticketspriority := int(ticketpriority)
			tickets.Priority = models.Priority(ticketspriority)
			tickets.Status = true
			tickets.Save()
		}
	}
	return context
}
