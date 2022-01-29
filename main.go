package main

import (
	"github.com/uadmin/uadmin"
)

func main() {
	DBconfig()
	RegisterModels()
	RegisterHandlers()
	NMSHandlers()
	ServerandPort()
}

func RegisterModels() {

}

func RegisterHandlers() {

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
