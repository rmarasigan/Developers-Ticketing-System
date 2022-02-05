package models

import (
	"github.com/uadmin/uadmin"
)

type Solution struct {
	uadmin.Model
	SolutionDesc string
	FilesChanged string
	Ticket       Ticket
	TicketID     uint
}

func (s *Solution) String() string {
	return s.SolutionDesc
}
