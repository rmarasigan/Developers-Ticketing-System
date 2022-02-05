LoadTickets();
$('.search-icon').on("click", function () {
    SearchTickets();
})

$('.ticket-searchbar').keyup(function (e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
        SearchTickets();
    }
})

function SearchTickets() {
    $("#ticket-append").empty()
    var search = $(".ticket-searchbar").val();
    if (search != null || search != undefined || search != "") {
        var url = "/admin/api/d/ticket/read/?$preload=1&Status=0&$order=-id&Name__icontains=" + search;
        var counter = 1;
        $.get(url, function (index, response) {
            var indexResult = JSON.parse(index).result
            $.each(indexResult, function (ind, value) {
                $("#ticket-append").append(`
                <div class="col-lg-4 col-md-6 col-sm-12 col-12 mb-3 ticket-card__wrapper">
                    <div class="card" onclick="closedticketmodal(` + value.ID + `)">
                        <div class="card-body">
                            <div class="card-title row tickets-card-title">
                                <div class="col-sm-2">
                                    <h4 class="ticket-card__number">` + value.ID + `</h4>
                                </div>
                                <div class="col-sm-10">
                                    <h3 class="ticket-card__title">` + value.Name + `</h3>
                                </div>
                            </div>
                            <section class="row">
                                <div class="borderbot"></div>
                            </section>
                            <div class="card-description">
                                <h4 class="ticket-card__system" id="System-`+ value.ID + `">` + toSystem(value.SystemID, value.ID) + `</h4>
                                <h5 class="ticket-card__date--closed">`+ toDate(value.DateClosed) + `</h5>
                                <h5 id="AssignedTo-`+ value.ID + `" class="ticket-card__assignedto">` + toUser(value.AssignedToID, value.ID) + `</h5>
                            </div>
                        </div>
                    </div>
                </div>`)
                counter++;
            })
        })
    }
}

function LoadTickets() {
    var url = "/admin/api/d/ticket/read/?Status=0&$order=-id"
    var counter = 1;
    $.get(url, function (index, response) {
        var indexResult = JSON.parse(index).result
        $.each(indexResult, function (ind, value) {
            $("#ticket-append").append(`
            <div class="col-lg-4 col-md-6 col-sm-12 col-12 mb-3 ticket-card__wrapper">
                <div class="card" onclick="closedticketmodal(` + value.ID + `)">
                    <div class="card-body">
                        <div class="card-title row tickets-card-title">
                            <div class="col-sm-2">
                                <h4 class="ticket-card__number">` + value.ID + `</h4>
                            </div>
                            <div class="col-sm-10">
                                <h3 class="ticket-card__title">` + value.Name + `</h3>
                            </div>
                        </div>
                        <section class="row">
                            <div class="borderbot"></div>
                        </section>
                        <div class="card-description">
                            <h4 class="ticket-card__system" id="System-`+ value.ID + `">` + toSystem(value.SystemID, value.ID) + `</h4>
                            <h5 class="ticket-card__date--closed">`+ toDate(value.DateClosed) + `</h5>
                            <h5 id="AssignedTo-`+ value.ID + `" class="ticket-card__assignedto">` + toUser(value.AssignedToID, value.ID) + `</h5>
                        </div>
                    </div>
                </div>
            </div>
            `)
            counter++;

        })
    })

}

// Searching Tickets
function closedticketmodal(ID) {
    var url = "/admin/api/d/ticket/read/?$preload=1&Status=0&ID=" + ID;

    $.get(url, function (index, response) {
        var tickets = JSON.parse(index).result
        $.each(tickets, function (key, value) {
            $("#closed-ticket-modal").modal('show');
            document.getElementById("modal-title").innerHTML = value.Name;
            // document.getElementById("description-input-modal").value = value.Description;
            $('#close-date-modal').val(toMonthsModal(value.DateClosed) +" "+ toDays(value.DateClosed) + ", " +  toYear(value.DateClosed))

            var regex = /(<([^>]+)>)/ig
            result = (value.Description).replace(regex, "");
            $("#description-input-modal").text(result)
            $("#system-input-modal").val(value.System.SystemName)
            $("#modal-ticket__assignedto").val(value.AssignedTo.FirstName + " " + value.AssignedTo.LastName)
            switch (value.Priority){
                case 1 :
                    $("#priority-input-modal").val("Low")
                    $("#priority-badge").text("Low")
                    $("#priority-badge").css('background-color', "var(--color-low)")
                    $("#priority-badge").css('color', "var(--color-epic)")
                    break;
                case 2: 
                    $("#priority-input-modal").val("Medium")
                    $("#priority-badge").text("Medium")
                    $("#priority-badge").css('background-color', "var(--color-medium)")
                    $("#priority-badge").css('color', "var(--color-epic)")
                    break;
                case 3: 
                    $("#priority-input-modal").val("High")
                    $(".priority-badge").text("High")
                    $("#priority-badge").css('background-color', "var(--color-high)")
                    $("#priority-badge").css('color', "white")
                    break;
                case 4: 
                    $("#priority-input-modal").val("Info")
                    $("#priority-badge").text("Info")
                    $("#priority-badge").css('background-color', "var(--color-info)")
                    $("#priority-badge").css('color', "white")
                    break;
                case 5: 
                    $("#priority-input-modal").val("Epic")
                    $("#priority-badge").text("Epic")
                    $("#priority-badge").css('background-color', "var(--color-epic)")
                    $("#priority-badge").css('color', "white")
                    break;
                default:
                    $("#priority-input-modal").val("Priority")
                    $("#priority-badge").text("Priority")
                    $("#priority-badge").css('background-color', "var(--color-primary)")
                    $("#priority-badge").css('color', "white")                             
            }
        })
    })
}


// Formatters
function toDays(dateStr) {
    var parts = dateStr.split("-")
    var day = (parts[2]).split("T")
    return day[0]
}

function toDate(dateStr) {
    var parts = dateStr.split("T")
    var date = parts[0].split("-")
    var months = toMonths(date[2])
    console.log(months, typeof (date[2]))
    var finaldate = months + " " + date[1] + ", " + date[0]
    return finaldate
}

function toMonths(dateStr) {
    switch (dateStr) {
        case "01" || "1":
            return "January";
        case "02" || "2":
            return "February";
        case "03" || "3":
            return "March";
        case "04" || "4":
            return "April";
        case "05" || "5":
            return "May";
        case "06" || "6":
            return "June";
        case "07" || "7":
            return "July";
        case "08" || "8":
            return "August";
        case "09" || "9":
            return "September";
        case "10":
            return "October";
        case "11":
            return "November";
        case "12":
            return "December";
    }
}

function toYear(dateStr) {
    var parts = dateStr.split("-")
    return parts[0]
}


function toTime(dateStr) {
    var parts = dateStr.split("T")
    var time = (parts[1]).split("+")
    return time[0]
}

function toUser(id, ele) {
    var url = "/admin/api/d/user/read/?ID="
    url += id;
    $.get(url, function (index, response) {
        var responseResult = JSON.parse(index).result
        $.each(responseResult, function (key, value) {
            if (value.ID == id) {
                var FirstName = JSON.stringify(value.FirstName)
                FirstName = FirstName.split('"')
                var fname = FirstName[1];
                var LastName = JSON.stringify(value.LastName)
                LastName = LastName.split('"')
                var lname = LastName[1]
                var fullname = fname + " " + lname;
                document.getElementById("AssignedTo-" + ele).innerHTML = fullname;
            }
        })
    })
}

function toSystem(id, ele) {
    var url = "/admin/api/d/ticket/read/?ID="
    url += ele;
    $.get(url, function (index, response) {
        var responseResult = JSON.parse(index).result
        $.each(responseResult, function (key, value) {
            if (value.SystemID == id) {
                $.get("/admin/api/d/system/read/?ID=" + id, function (k, v) {
                    var system = JSON.parse(k).result
                    $.each(system, function (i, j) {
                        document.getElementById("System-" + ele).innerHTML = j.SystemName;
                    })
                })
            }
        })
    })
}

function toMonthsModal(dateStr) {
    var parts = dateStr.split("-")
    switch (parts[1]) {
        case "01" || "1":
            return "January";
        case "02" || "2":
            return "February";
        case "03" || "3":
            return "March";
        case "04" || "4":
            return "April";
        case "05" || "5":
            return "May";
        case "06" || "6":
            return "June";
        case "07" || "7":
            return "July";
        case "08" || "8":
            return "August";
        case "09" || "9":
            return "September";
        case "10":
            return "October";
        case "11":
            return "November";
        case "12":
            return "December";
    }
}
