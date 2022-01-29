package models

import (
	"time"

	"github.com/uadmin/uadmin"
)

type Ticket struct {
	uadmin.Model
	TicketName        string
	TicketDescription string
	System            System
	SystemID          uint
	TicketStatus      bool
	Priority          Priority
	CreatedBy         string
	DateCreated       time.Time
}

//Priority Type with returns
type Priority int

func (Priority) Low() Priority {
	return 1
}
func (Priority) Medium() Priority {
	return 2
}
func (Priority) High() Priority {
	return 3
}
