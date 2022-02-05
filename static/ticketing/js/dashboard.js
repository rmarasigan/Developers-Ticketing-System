LoadTickets();
var developers = "/admin/api/d/user/read/?user_group_id=1";
$.get(developers, function(_index, _response){
    var devs = JSON.parse(_index).result;
    $.each(devs, function(_key, _value){
        $(".modal-ticket__assignedto").append(`
            <option value="`+_value.ID+`">`+ _value.FirstName + " " + _value.LastName +`</option>
        `)
    })
})

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
        var url = "/admin/api/d/ticket/read/?$preload=1&$order=-id&Status=1&Name__icontains=" + search;
        var counter = 1;
        $.get(url, function (index, response) {
            var indexResult = JSON.parse(index).result
            $.each(indexResult, function (ind, value) {
                $("#ticket-append").append(`
                <div class="col-lg-4 col-md-6 col-sm-12 col-12 mb-3 ticket-card__wrapper">
                    <div class="card" onclick="onclickModal(` + value.ID + `)"">
                        <div class="card-body">
                            <div class="card-title row tickets-card-title">
                                <div class="col-sm-2">
                                    <h4 class="ticket-card__number" onclick="badge(`+value.ID+`">` + value.ID + `</h4>
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
                                <h5 class="ticket-card__date-created">`+ toDate(value.DateCreated) + `</h5>
                                <h5 id="AssignedTo-`+ value.ID + `" class="ticket-card__assignedto">` + toUser(value.AssignedToID, value.ID) + `</h5>
                            </div>
                        </div>
                    </div>
                </div>
                `)
                $('.ticket-card__number').css('color', 'var(--color-info)')
                counter++;
            })
        })
    }
}

function LoadTickets() {
    var url = "/admin/api/d/ticket/read/?$preload=1&Status=1&$order=-id"
    var counter = 1;
    $.get(url, function (index, response) {
        var indexResult = JSON.parse(index).result
        $.each(indexResult, function (ind, value) {
            $("#ticket-append").append(`
            <div class="col-lg-4 col-md-6 col-sm-12 col-12 mb-3 ticket-card__wrapper">
                <div class="card" onclick="onclickModal(` + value.ID + `)"">
                    <div class="card-body">
                        <div class="card-title row tickets-card-title">
                            <div class="col-sm-2">
                                <h4 id="ticket-card__number--`+ value.ID +`" class="ticket-card__number">` + value.ID + `</h4>
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
                            <h5 class="ticket-card__date-created">`+ toMonthsModal(value.DateCreated) +" "+ toDays(value.DateCreated) + ", " +  toYear(value.DateCreated) + `</h5>
                            <h5 id="AssignedTo-`+ value.ID + `" class="ticket-card__assignedto">` + toUser(value.AssignedToID, value.ID) + `</h5>
                        </div>
                    </div>
                </div>
            </div>
            `).on("ready",badge(value.ID));
            counter++;

        })
    })

}
function badge(ID){
    var url = "/admin/api/d/ticket/read?"
    $.get(url, function(index, response){
        var tickets = JSON.parse(index).result;
        $.each(tickets, function(key, value){
            if (value.ID == ID){
                console.log("GGRRR", value.Priority , " value.ID ", value.ID, "ID ", ID);
                switch (value.Priority){
                    case 1 || '1':
                        $("#ticket-card__number--" +ID).attr('style','background-color: var(--color-low)')
                        $("#ticket-card__number--" +ID).css('color', "var(--color-epic)")
                        console.log("1")
                        break;
                    case 2 || '2': 
                        $("#ticket-card__number--" +ID).attr('style', 'background-color: var(--color-medium)')
                        $("#ticket-card__number--" +ID).css('color', "var(--color-epic)")
                        console.log("2")
                        break;
                    case 3 || '3': 
                        $("#ticket-card__number--" +ID).attr('style', 'background-color: var(--color-high)')
                        $("#ticket-card__number--" +ID).css('color', "white")
                        console.log("3")
                        break;
                    case 4 || '4': 
                        $("#ticket-card__number--" +ID).attr('style', 'background-color: var(--color-info)')
                        $("#ticket-card__number--" +ID).css('color', "white")
                        console.log("4")
                        break;
                    case 5 || '5': 
                        $("#ticket-card__number--" +ID).attr('style', 'background-color: var(--color-epic)')
                        $("#ticket-card__number--" +ID).css('color', "white")
                        console.log("5")
                        break;
                    default:
                        $("#ticket-card__number--" +ID).attr('style', 'background-color: var(--color-primary)')
                        $("#ticket-card__number--" +ID).css('color', "white")
                        console.log("default")                             
                }
            }
        })
    })

}
// Searching Tickets
function onclickModal(ID) {
    var url = "/admin/api/d/ticket/read/?$preload=1&Status=1&ID=" + ID;
    $.get(url, function (index, response) {
        var tickets = JSON.parse(index).result
        $.each(tickets, function (key, value) {
            $("#card-modal").modal('show');
            document.getElementById("modal-title").innerHTML = value.Name;
            $('#create-date-modal').val(toMonthsModal(value.DateCreated) +" "+ toDays(value.DateCreated) + ", " +  toYear(value.DateCreated))

            var regex = /(<([^>]+)>)/ig
            result = (value.Description).replace(regex, "");
            // $("#description-input-modal").val(result)
            $("#description-input-modal").text(result)
            // $("textarea").height( $("textarea")[0].scrollHeight );
            $("#system-input-modal").val(value.System.SystemName)
            if ((value.AssignedTo.FirstName == undefined && value.AssignedTo.LastName == undefined) || (value.AssignedTo.FirstName == "" && value.AssignedTo.LastName == "")) {
                $("#assignedto-input-modal").val("-")
            } else {
                $("#assignedto-input-modal").val(value.AssignedTo.FirstName + " " + value.AssignedTo.LastName)
            }
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
                    $("#priority-badge").text("High")
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
            $(".modal-ticket__assignedto").val(value.AssignedToID);
            $("#modal-ticket__save").attr('onclick', 'saveAssigned(' + ID + ')')
        })
    })
}

function saveAssigned(ID){
    $.ajax({
        "method": "POST",
        "data":
        {
            "data-action": "save-assigned",
            "ID": ID,
            "assignedto": $(".modal-ticket__assignedto").val(),
        }, "success": function () {
            $("#card-modal").modal('hide');
            $(".ticket_saved").modal('show');
            $(".modal-ticket__assignedto").val("0")
        }
    })
}

// Formatters
function toDays(dateStr) {
    var parts = dateStr.split("-")
    var day = (parts[2]).split("T")
    return day[0]
}

function toMonths(dateStr) {
    var parts = dateStr.split("-")
    switch (parts[1]) {
        case "01" || "1":
            return "Jan";
        case "02" || "2":
            return "Feb";
        case "03" || "3":
            return "Mar";
        case "04" || "4":
            return "Apr";
        case "05" || "5":
            return "May";
        case "06" || "6":
            return "June";
        case "07" || "7":
            return "July";
        case "08" || "8":
            return "Aug";
        case "09" || "9":
            return "Sept";
        case "10":
            return "Oct";
        case "11":
            return "Nov";
        case "12":
            return "Dec";
    }
}

function toYear(dateStr) {
    var parts = dateStr.split("-")
    return parts[0]
}
function toDate(dateStr) {
    var parts = dateStr.split("T")
    return parts[0]
}

function toTime(dateStr) {
    var parts = dateStr.split("T")
    var time = (parts[1]).split("+")
    return time[0]
}

function toUser(id, ele) {
    if (id == "0") {
        var url = "/admin/api/d/user/read/?ID=0"
        $.get(url, function (index, response) {
            if (id == "0") {
                var none = "Not Yet Assigned"
                document.getElementById("AssignedTo-" + ele).innerHTML = none
            }
        })
    }
    var url = "/admin/api/d/user/read/?ID="
    url += id;
    $.get(url, function (index, response) {
        var responseResult = JSON.parse(index).result
        $.each(responseResult, function (key, value) {
            // if (id == 0 || id == "0" || id == "" || id == undefined){
            //     var none = "-"
            //     document.getElementById("AssignedTo-" + ele).innerHTML = none
            // }
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
