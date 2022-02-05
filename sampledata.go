package main

import (
	"github.com/mark/developers_ticketing_system/models"
	"github.com/uadmin/uadmin"
)

func sampleData() {
	// var usergroupID uint
	usergroup := []uadmin.UserGroup{}
	uadmin.All(&usergroup)

	defaultUserGroup := []uadmin.UserGroup{
		{
			GroupName: "Developers",
		},
		{
			GroupName: "Employees",
		},
	}
	usergroupExist := false
	for i := range defaultUserGroup {
		usergroupExist = false
		for _, userg := range usergroup {
			if defaultUserGroup[i].GroupName == userg.GroupName {
				usergroupExist = true
				break
			}
		}
		if !usergroupExist {
			uadmin.Save(&defaultUserGroup[i])
		}
	}

	users := []uadmin.User{}
	uadmin.All(&users)

	defaultUser := []uadmin.User{
		{
			FirstName:    "Russianhielle",
			LastName:     "Marasigan",
			Username:     "rmarasigan",
			Password:     "Password11",
			Email:        "rmarasigan@integritynet.biz",
			UserGroup:    uadmin.UserGroup{},
			UserGroupID:  1,
			Active:       true,
			Admin:        true,
			RemoteAccess: false,
		},
		{
			FirstName:    "Harold Jeshua",
			LastName:     "Varde",
			Username:     "hjvarde",
			Password:     "Password11",
			Email:        "hjvarde@integritynet.biz",
			UserGroup:    uadmin.UserGroup{},
			UserGroupID:  1,
			Active:       true,
			Admin:        true,
			RemoteAccess: false,
		},
		{
			FirstName:    "Mark Bryan",
			LastName:     "De Guzman",
			Username:     "mbdeguzman",
			Password:     "Password11",
			Email:        "mbdeguzman@integranet.ph",
			UserGroup:    uadmin.UserGroup{},
			UserGroupID:  1,
			Active:       true,
			Admin:        true,
			RemoteAccess: false,
		},
		{
			FirstName:    "Lemuel",
			LastName:     "Fajarda",
			Username:     "lfajarda",
			Password:     "Password11",
			Email:        "lfajarda@integranet.ph",
			UserGroup:    uadmin.UserGroup{},
			UserGroupID:  1,
			Active:       true,
			Admin:        true,
			RemoteAccess: false,
		},
		{
			FirstName:    "Mary Jane",
			LastName:     "Malibiran",
			Username:     "mjmalibiran",
			Password:     "Password11",
			Email:        "mjmalibiran@integranet.ph",
			UserGroup:    uadmin.UserGroup{},
			UserGroupID:  1,
			Active:       true,
			Admin:        true,
			RemoteAccess: false,
		},
	}

	userExist := false
	for i := range defaultUser {
		userExist = false

		for _, user := range users {
			if defaultUser[i].Username == user.Username {
				userExist = true
				break
			}
		}

		if !userExist {
			defaultUser[i].Save()
			// usergroupID = defaultUser[i].ID
			uadmin.Save(&defaultUser[i])
		}
	}
	systems := []models.System{}
	uadmin.All(&systems)

	defaultsystem := []models.System{
		{
			SystemName:  "Share Cafe",
			Description: "Website of Share Cafe",
			SystemURL:   "https://sharecafe.ph/web/",
		},
		{
			SystemName:  "Zumumu",
			Description: "Point of Sale system of Share Cafe",
			SystemURL:   "https://008.zumumu.com/console/",
		},
		{
			SystemName:  "TM System",
			Description: "Time Management and Login System of IntegraNet, IntegrityNet and Share Cafe Employees",
			SystemURL:   "http://192.168.149.54:5959/login#no-back-button",
		},
		{
			SystemName:  "Portal System",
			Description: "Portal System of IntegraNet, IntegrityNet and Share Cafe Employees for updates, announcements, payslip viewing, etc",
			SystemURL:   "http://192.168.150.253/IntegrityApp/integrity_intranet/loginForm.php",
		},
		{
			SystemName:  "IntegraNet Email",
			Description: "Emailing System of Integranet Employees",
			SystemURL:   "https://mail.integranet.ph",
		},
		{
			SystemName:  "IntegrityNet Email",
			Description: "Emailing System of Integranet Employees",
			SystemURL:   "https://mail.integritynet.biz",
		},
		{
			SystemName:  "ShareCafe Email",
			Description: "Emailing System of Share Cafe Employees",
			SystemURL:   "https://mail.sharecafe.ph",
		},
	}
	systemExist := false

	for i := range defaultsystem {
		systemExist = false

		for _, system := range systems {
			if defaultsystem[i].SystemName == system.SystemName {
				systemExist = true
				break
			}
		}

		if !systemExist {
			uadmin.Save(&defaultsystem[i])
		}
	}
}
