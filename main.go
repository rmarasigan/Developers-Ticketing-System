package main

import (
	"net/http"

	"github.com/mark/developers_ticketing_system/models"
	"github.com/mark/developers_ticketing_system/views"
	"github.com/uadmin/uadmin"
)

func main() {
	DBconfig()
	RegisterModels()
	RegisterHandlers()
	RegisterInlines()
	NMSHandlers()
	ServerandPort()
}

func RegisterModels() {
	uadmin.Register(
		models.Ticket{},
		models.System{},
		models.User_Profile{},
		models.Department{},
	)
}

func RegisterHandlers() {
	http.HandleFunc("/", uadmin.Handler(views.LoginHandler))
	http.HandleFunc("/ticketing/", uadmin.Handler(views.TicketingHandler))
}

func RegisterInlines() {
	uadmin.RegisterInlines(models.System{}, map[string]string{
		"Ticket": "SystemID",
	})

	uadmin.RegisterInlines(uadmin.User{}, map[string]string{
		"Ticket": "AssignedToID",
	})
}

func DBconfig() {
	uadmin.Database = &uadmin.DBSettings{
		Type:     "mysql",
		Name:     "system_ticketing",
		User:     "root",
		Password: "Allen is Great 200%",
		Host:     "localhost",
		Port:     3306,
	}
}

func NMSHandlers() {

}

func ServerandPort() {
	uadmin.Port = 2424
	uadmin.RootURL = "/admin/"
	uadmin.SiteName = "Developers Ticketing System"
	uadmin.BindIP = "localhost"
	uadmin.StartServer()
}
