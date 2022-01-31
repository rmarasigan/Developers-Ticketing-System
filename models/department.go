package models

import (
	"github.com/uadmin/uadmin"
)

type Department struct {
	uadmin.Model
	Name        string
	Description string
}
