package models

import (
	"fmt"

	"github.com/uadmin/uadmin"
)

type User_Profile struct {
	uadmin.Model
	User         uadmin.User
	UserID       uint
	System       System
	SystemID     uint
	EmployeeID   int
	Department   Department
	DepartmentID uint
	Status       Status
}

type Status int

func (Status) Employed() Status {
	return 1
}
func (Status) Leave() Status {
	return 2
}
func (Status) Resigned() Status {
	return 3
}

func (u *User_Profile) String() string {
	return fmt.Sprint(u.EmployeeID)
}
