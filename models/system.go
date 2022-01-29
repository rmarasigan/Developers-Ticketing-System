package models

import (
	"github.com/uadmin/uadmin"
)

type System struct {
	uadmin.Model
	SystemName string
	SystemURL  string
}
