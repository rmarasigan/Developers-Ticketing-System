package models

import (
	"github.com/uadmin/uadmin"
)

type System struct {
	uadmin.Model
	SystemName string
	SystemURL  string
}

func (s *System) String() string {
	return s.SystemName
}
