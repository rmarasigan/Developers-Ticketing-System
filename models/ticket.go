package models

import (
	"time"

	"github.com/uadmin/uadmin"
)

type Ticket struct {
	uadmin.Model
	Name         string `uadmin:"required;list_exclude"`
	Description  string `uadmin:"html;required" gorm:"type:longtext"`
	System       System
	SystemID     uint
	AssignedTo   uadmin.User
	AssignedToID uint
	Status       bool
	Priority     Priority
	CreatedBy    string    `uadmin:"read_only hidden"`
	DateCreated  time.Time `uadmin:"read_only hidden"`
	DateClosed   time.Time `uadmin:"read_only hidden"`
}

type Priority int

func (Priority) Low() int {
	return 1
}
func (Priority) Medium() int {
	return 2
}
func (Priority) High() int {
	return 3
}
func (Priority) Info() int {
	return 4
}
func (Priority) Epic() int {
	return 5
}

func (t *Ticket) String() string {
	return t.Name
}

func (t *Ticket) Save() {
	if t.DateCreated.IsZero() {
		t.DateCreated = time.Now()
	} else {
	}
	if !t.Status {
		t.DateClosed = time.Now()
	} else {
		t.DateClosed = time.Date(1999, 1, 1, 0, 0, 0, 0, time.UTC)
	}
	uadmin.Save(t)
}
