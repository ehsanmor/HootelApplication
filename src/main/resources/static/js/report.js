$(function() {
    var loggedInEmployeeId = 0;
    var $j = jQuery.noConflict();
    $j(".datePicker").datepicker();
    $j(".datePicker").datepicker("option", "dateFormat", "dd-mm-yy");
//    $j(".datePicker").datepicker("option", "minDate", new Date());

    $("#btnOpenReport").click(function() {
        if ($.fn.dataTable.isDataTable('#reservationsReportTable')) {
            $('#reservationsReportTable').DataTable().destroy();
            $('#reservationsReportTable').empty();
        }
        getReservationsForReport(changeDateFormat($('#startDateReport').val()), changeDateFormat(($('#endDateReport').val())));
        //        console.log(changeDateFormat($('#startDateReport').val()), changeDateFormat(($('#endDateReport').val())));
    })
});

function getReservationsForReport(fromDate, toDate) {

    $.ajax({
        url: 'http://localhost:8080/api/reservation/report/' + fromDate + "/" + toDate,
        type: 'GET',
        contentType: 'application/json',
        dataType: "json"
    }).done(function(data) {
        $('#reservationsReportTable').dataTable({
            order: [
                [0, "asc"]
            ],
            data: data,
            columns: [
                //                { data: "id", title: "id" },
                {
                    data: "reservedRooms",
                    title: "Room No",
                    render: function(data, type, row) {
                        var rooms = "";
                        $.each(data, function() {
                            $.each(this, function(k, v) {
                                if (k == "roomNo") {
                                    if (rooms.length > 0) {
                                        rooms = rooms + " , " + v;
                                    } else {
                                        rooms = rooms + "  " + v;
                                    }
                                }
                            });
                        });
                        return rooms;
                    }
                },
                {
                    data: "guest",
                    title: "Guest",
                    render: function(data) {
                        if ($.trim(data)) {
                            return data["firstName"] + " " + data["lastName"];
                        }
                    }
                },
                {
                    data: "startDate",
                    title: "From date",
                    render: function(data) {
                        return changeDateFormat(data);
                    }
                },
                {
                    data: "endDate",
                    title: "To Date",
                    render: function(data) {
                        return changeDateFormat(data);
                    }
                },
                {
                    data: "checkIn",
                    title: "Check In",
                    render: function(data) {
                        return changeDateFormat(data);
                    }
                },
                {
                    data: "checkOut",
                    title: "Check Out",
                    render: function(data) {
                        return changeDateFormat(data);
                    }
                },
                {
                    data: "paymentDate",
                    title: "Payment Date",
                    render: function(data) {
                        return changeDateFormat(data);
                    }
                },
                {
                    data: "resChecked",
                    title: "Room Checked before Checkout ",
                    render: function(data) {
                        return data ? "Yes" : "";
                    }
                },
                { data: "price", title: "Total Price" },
                { data: "additionalPrice", title: "Additional Price" },
                { data: "paymentType", title: "Payment Type" },
                {
                    data: "resEnded",
                    title: "Ended",
                    render: function(data) {
                        return data ? "Yes" : "";
                    }
                },
                {
                    data: "employee",
                    title: "Employee",
                    render: function(data) {
                        if ($.trim(data)) {
                            return data["firstName"] + " " + data["lastName"];
                        }
                    }
                }
            ]
        });
    });
}