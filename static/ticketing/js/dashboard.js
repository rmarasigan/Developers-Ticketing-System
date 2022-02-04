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
        var url = "/admin/api/d/ticket/read/?$preload=1&$order=-id&Status=1&Name__icontains=" + search;
        var counter = 1;
        $.get(url, function (index, response) {
            var indexResult = JSON.parse(index).result
            $.each(indexResult, function (ind, value) {
                $("#ticket-append").append(`<div class="card ticket__card card-` + value.ID + ` fl-left col-xl-6 col-sm-12 ms-2" onclick="onclickModal(` + value.ID + `)">
                <div class = "row ms-3">
                <section class="date col-3">
                <time>
                    <span>` + toDays(value.DateCreated) + `</span><span>` + toMonths(value.DateCreated) + `</span><span>` + toYear(value.DateCreated) + `</span>
                </time>
                </section>
                <section class="card-cont col-9">
                <small class="ticket-number">#` + value.ID + `</small><br>
                <span class="ticket-name">&nbsp;&#9678 ` + value.Name + `&nbsp;&nbsp;</span>
                <h1 id="System-`+ value.ID + `">` +
                    toSystem(value.SystemID, value.ID)
                    + `</h1>
                <div class="even-date">
                    <time>
                    <p class="date-created">` + toDate(value.DateCreated) + `</p>
                    
                    </time>
                    <time>
                    <p class="date-created">` + toTime(value.DateCreated) + `</p>
                    </time>
                </div>
                <div class="even-info">
                    <span id="AssignedTo-`+ value.ID + `">` +
                    toUser(value.AssignedToID, value.ID)
                    + `</span>
                </div>
                </section>  
                </div>
                </div>`)
                counter++;
            })
        })
    }
}

function LoadTickets() {
    var url =  "/admin/api/d/ticket/read/?$preload=1&Status=1&$order=-id"
    var counter = 1;
    $.get(url, function (index, response) {
        var indexResult = JSON.parse(index).result
        $.each(indexResult, function (ind, value) {
            $("#ticket-append").append(
                `<div class="card ticket__card card-` + value.ID + ` fl-left col-xl-6 col-sm-12 ms-2" onclick="onclickModal(` + value.ID + `)">
        <div class = "row ms-3">
        <section class="date col-3">
        <time>
            <span>` + toDays(value.DateCreated) + `</span><span>` + toMonths(value.DateCreated) + `</span><span>` + toYear(value.DateCreated) + `</span>
        </time>
        </section>
        <section class="card-cont col-9">
        <small class="ticket-number">#` + value.ID + `</small><br>
        <span class="ticket-name">&nbsp;&#9678 ` + value.Name + `&nbsp;&nbsp;</span>
        <h1 id="System-`+ value.ID + `">` +
                toSystem(value.SystemID, value.ID)
                + `</h1>
        <div class="even-date">
            <time>
            <p class="date-created">` + toDate(value.DateCreated) + `</p>
            
            </time>
            <time>
            <p class="date-created">` + toTime(value.DateCreated) + `</p>
            </time>
        </div>
        <div class="even-info">
            <span id="AssignedTo-`+ value.ID + `">` +
                toUser(value.AssignedToID, value.ID)
                + `</span>
        </div>
        </section>  
        </div>
        </div>`)
            counter++;

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
            // document.getElementById("description-input-modal").value = value.Description;
            $('#created-date-modal').text(toMonthsModal(value.DateCreated))
            $("#created-month-modal").text(toDays(value.DateCreated))
            $("#created-year-modal").text(toYear(value.DateCreated))

            var regex = /(<([^>]+)>)/ig
            result = (value.Description).replace(regex, "");
            // $("#description-input-modal").val(result)
            $("#description-input-modal").text(result)
            // $("textarea").height( $("textarea")[0].scrollHeight );
            $("#system-input-modal").val(value.System.SystemName)
            if ((value.AssignedTo.FirstName == undefined && value.AssignedTo.LastName == undefined) || (value.AssignedTo.FirstName == "" && value.AssignedTo.LastName == "")){
                $("#assignedto-input-modal").val("-")
            }else{
                $("#assignedto-input-modal").val(value.AssignedTo.FirstName + " " + value.AssignedTo.LastName)
            }
            if (value.Priority == 1) {
                $("#priority-input-modal").val("Low")
                $(".priority-badge").text("Low")
                $("#priority-badge").css('background-color', "#ffc107")
            } else if (value.Priority == 2) {
                $("#priority-input-modal").val("Medium")
                $(".priority-badge").text("Medium")
                $("#priority-badge").css('background-color', "#fd7e14")
            } else {
                $("#priority-input-modal").val("High")
                $(".priority-badge").text("High")
                $("#priority-badge").css('background-color', "#dc3545")
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
    if (id == "0"){
        var url = "/admin/api/d/user/read/?ID=0"
        $.get(url, function (index, response) {
            console.log("FHUSDIFHDSUI", id)
            if (id == "0"){
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
