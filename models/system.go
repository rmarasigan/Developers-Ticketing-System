package models

import (
	"github.com/uadmin/uadmin"
)

type System struct {
	uadmin.Model
	SystemName  string `uadmin:"required"`
	Description string `uadmin:"html" gorm:"type:longtext"`
	SystemURL   string `uadmin:"required"`
}

func (s *System) String() string {
	return s.SystemName
}
