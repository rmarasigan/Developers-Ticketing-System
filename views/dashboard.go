package views

import (
	"net/http"
	"strconv"
	"time"

	"github.com/mark/developers_ticketing_system/models"
	"github.com/uadmin/uadmin"
)

func Dashboard(w http.ResponseWriter, r *http.Request) map[string]interface{} {
	username := uadmin.IsAuthenticated(r).User.FirstName
	username += " " + uadmin.IsAuthenticated(r).User.LastName

	context := map[string]interface{}{}
	tickets := models.Ticket{}
	uadmin.Preload(&tickets)
	systems := []models.System{}
	uadmin.All(&systems)
	users := []uadmin.User{}
	uadmin.All(&users)
	solutions := models.Solution{}
	// uadmin.All(&solution)

	if r.Method == "POST" {
		dataAction := r.FormValue("data-action")
		if dataAction == "save-ticket" {
			tickets.Name = r.FormValue("name")
			tickets.Description = r.FormValue("description")
			ticketsystem, _ := strconv.ParseInt(r.FormValue("system"), 10, 64)

			// tickets.SystemID = uint(ticketsystem)
			for i := range systems {
				if systems[i].ID == uint(ticketsystem) {
					tickets.System = systems[i]
					tickets.SystemID = systems[i].ID
				}
			}

			ticketpriority, _ := strconv.ParseInt(r.FormValue("priority"), 10, 64)
			ticketspriority := int(ticketpriority)
			tickets.Priority = models.Priority(ticketspriority)
			tickets.Status = true
			tickets.CreatedBy = username
			tickets.Save()
		}
	}
	if r.Method == "POST" {
		data_action := r.FormValue("data-action")
		ID := r.FormValue("ID")
		// ticketID, _ := strconv.ParseInt(ID, 10, 64)
		if data_action == "save-assigned" {
			uadmin.Get(&tickets, "id = ?", ID)
			uadmin.Preload(&tickets)
			devID, _ := strconv.ParseInt(r.FormValue("assignedto"), 10, 64)

			for j := range users {
				if users[j].ID == uint(devID) {
					tickets.AssignedTo = users[j]
					tickets.AssignedToID = users[j].ID
					uadmin.Save(&tickets)
				}
			}
		}
	}

	if r.Method == "POST" {
		dataaction := r.FormValue("data-action")
		ticketID := r.FormValue("ticket-id")

		if dataaction == "save-comment" {
			uadmin.Get(&tickets, "id = ?", ticketID)
			// uadmin.Trail(uadmin.DEBUG, "TICKETID %v", tickets.ID)

			tickets.DateClosed = time.Now()
			tickets.Status = false
			solutions.SolutionDesc = r.FormValue("solutiondesc")
			solutions.FilesChanged = r.FormValue("files")
			solutions.Ticket = tickets
			solutions.TicketID = tickets.ID
			uadmin.Save(&solutions)
			uadmin.Save(&tickets)
		}
	}
	return context
}
