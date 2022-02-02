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
	CreatedBy    string    `uadmin:"read_only"`
	DateCreated  time.Time `uadmin:"read_only"`
	DateClosed   time.Time `uadmin:"read_only"`
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

func (t *Ticket) String() string {
	return t.Name
}

func (t *Ticket) Save() {
	if t.DateCreated.IsZero() {
		t.DateCreated = time.Now()
	} else {
		uadmin.Trail(uadmin.DEBUG, "A date has already been set")
	}
	if !t.Status {
		t.DateClosed = time.Now()
	} else {
		t.DateClosed = time.Date(1999, 1, 1, 0, 0, 0, 0, time.UTC)
	}
	uadmin.Save(t)
}
