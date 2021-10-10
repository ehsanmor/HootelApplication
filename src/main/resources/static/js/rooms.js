$(function() {
    var $j = jQuery.noConflict();
    $j(".datePicker").datepicker();
    $j(".datePicker").datepicker("option", "dateFormat", "dd-mm-yy");
    $j(".datePicker").datepicker("option", "minDate", new Date());

    $('body').removeClass('initial-hide');

    getSpecificTypes();
    getAllRooms();

    $("#addNewRoom").click(function() {
        ClearModal("edit_room_modal");
        document.getElementById("edit_room_modal").hidden = false;
        document.getElementById("updateRoom").hidden = true;
        document.getElementById("saveNewRoom").hidden = false;
    });

    $('#edit_room_modal').on('hidden.bs.modal', function(e) {
        $(this)
            .find("input[type=text],textarea,select")
            .val('')
            .end()
            .find("input[type=checkbox], input[type=radio]")
            .prop("checked", "")
            .end();
    })
});

function getSpecificTypes() {
    var arrItems = new Array();
    var arrGroups = new Array();
    var grpWithItems = {};
    var radioHTML = "";
    var checkHTML = "";

    $.ajax({
        url: 'http://localhost:8080/api/typeList/',
        type: 'GET'
    }).done(function(data) {
        $.each(data, function() {
            if ($.inArray(this.grouping, arrGroups) == -1) arrGroups.push(this.grouping);
            arrItems.push([this.grouping, this.typeName]);
        });

        for (var i = 0; i < arrGroups.length; i++) {
            var arrGroupItems = [];
            for (var j = 0; j < arrItems.length; j++) {
                var grp = arrItems[j][0];
                var value = arrItems[j][1];
                if (grp == arrGroups[i]) {
                    arrGroupItems.push(arrItems[j][1]);
                }
            }
            grpWithItems[arrGroups[i]] = arrGroupItems;
        }

        //        console.log(grpWithItems);
        for (var i = 0; i < grpWithItems["Room"].length; i++) {
            radioHTML += '<div class="form-check"><input class="form-check-input" type="radio" name="roomType" value="' + grpWithItems["Room"][i] + '" required><label class="form-check-label">' + grpWithItems["Room"][i] + '</label></div><br>';
        }
        $("#roomTypesList").html(radioHTML);

        for (var i = 0; i < grpWithItems["Facility"].length; i++) {
            checkHTML += '<div class="form-check"><input type="checkbox" class="form-check-input" value="' + grpWithItems["Facility"][i] + '"><label class="form-check-label">' + grpWithItems["Facility"][i] + '</label></div><br>';
        }
        $("#facilityTypesList").html(checkHTML);
    });
}

function roomNeedsCleaningCheck(lastCleanD, noDays) {
    if (lastCleanD != null && noDays > 0) {
        var from = lastCleanD.split("-");
        var lastCleanDate = new Date(from[2], from[1] - 1, from[0]);
        var diff = new Date(Date()) - lastCleanDate;
        var differenceDays = diff / 1000 / 60 / 60 / 24;
        if (differenceDays >= noDays) {
            return '<i class="fa fa-flag red-color"></i>';
        } else {
            return '';
        }
    }
}

function checkConstruction(statRoom) {
    var result = statRoom == null || !statRoom ? false : true;
    return result;
}

//function addRoomsFromTestData() {
//    $.each(testData, function (index, value) {
//        var arrFacilities = value['roomFacilities'];
//        var dBigCleanDate = StringToDate(value['roomLastBigClean']);
//        postData = JSON.stringify({
//            "roomNo": value["roomNo"],
//            "type": value["roomType"],
//            "capacity": value["roomSize"],
//            "price": value["roomPrice"],
//            "facilities": arrFacilities,
//            "lastBigCleaningDate": dBigCleanDate,
//            "numberOfDaysAfterBigClean": parseInt(value['roomBigCleanAfterInDays']),
//            "underConstruction": checkConstruction(value['roomUnderConstruction'])
//        });
//
//        $.ajax({
//            url: 'http://localhost:8080/api/room/',
//            type: 'POST',
//            contentType: 'application/json',
//            dataType: "json",
//            data: postData,
//            success: function (result) {
//                //                console.log(result);
//            },
//            error: function (e) {
//                console.log(e);
//            },
//        });
//    });
//}

function getAllRooms() {
    $.ajax({
        url: 'http://localhost:8080/api/room/',
        type: 'GET',
        contentType: 'application/json',
        dataType: "json"
    }).done(function(data) {
        $('#roomTable').dataTable({
            order: [
                [2, "asc"]
            ],
            data: data,
            columns: [
                { data: "id", title: "id", visible: false },
                {
                    data: "roomNeedsCleaning",
                    title: "Needs Cleaning",
                    render: function(data, type, row) {
                        var chkData = roomNeedsCleaningCheck(row["lastBigCleaningDate"], row["numberOfDaysAfterBigClean"]);

                        if (chkData) {
                            return '<i class="fa fa-flag red-color"></i>';
                        } else {
                            return null;
                        }
                    }
                },
                { data: "roomNo", title: "Room No" },
                { data: "type", title: "Room Type" },
                { data: "capacity", title: "Max Capacity" },
                { data: "price", title: "Price" },
                { data: "facilities", title: "Facilities" },
                {
                    data: "lastBigCleaningDate",
                    title: "Last Big Clean On:",
                    render: function(data) {
                        return changeDateFormat(data);
                    }
                },
                { data: "numberOfDaysAfterBigClean", title: "Big Clean After (in days)" },
                {
                    data: "underConstruction",
                    title: "Under Construction",
                    render: function(data) {
                        return data ? "Yes" : "";
                    }
                },
                {
                    title: "Edit",
                    data: "null",
                    searchable: false,
                    sortable: false,
                    render: function(data, type, row) {
                        return '<button data-action="edit" class="editExistingRoom btn btn-sm btn-info" data-toggle="modal" data-target="#edit_room_modal" data-id="' + row.id + '"><i class="fa fa-pencil fa-fw"></button>';
                    }
                },
                {
                    title: "Delete",
                    data: "id",
                    searchable: false,
                    sortable: false,
                    className: "dt-center",
                    render: function(data, type, row) {
                        //                        var roomIdDelete = 'return DeleteRow(' + data + ');';
                        return '<button data-action="delete" class="deleteRoom btn btn-sm btn-info" data-id="' + row.id + '"><i class="fa fa-trash fa-fw"></button>';
                        //                        return '<a href="#" class="btn btn-sm btn-info deleteRoom" onclick="' + roomIdDelete + '"><i class="fa fa-trash fa-fw"></a>';
                    }
                }
            ]
        });
    });
}

function reloadRoomsData() {
    if ($.fn.dataTable.isDataTable('#roomTable')) {
        $('#roomTable').DataTable().destroy();
        $('#roomTable').empty();
        document.getElementById("edit_room_modal").hidden = true;
        getAllRooms();
    }
}