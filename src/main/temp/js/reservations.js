$(function() {

    getAllReservations();
});

function getAllReservations() {
    $.ajax({
        url: 'http://localhost:8080/hotel/reservations',
        type: 'GET',
        contentType: 'application/json',
        dataType: "json"
    }).done(function(data) {
        $('#reservationsTable').dataTable({
            order: [
                [0, "asc"]
            ],
            data: data,
            columns: [
                //                { data: "id", title: "Id" },
                {
                    data: "room",
                    title: "Room No",
                    render: function(data) {
                        return data["id"];
                    }
                },
                {
                    data: "guest",
                    title: "Guest",
                    render: function(data) {
                        return data["firstName"] + " " + data["lastName"];
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
                { data: "paymentType", title: "payment Type" },
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
                        return data["firstName"] + " " + data["lastName"];
                    }
                },
                {
                    title: "Edit",
                    data: "id",
                    "searchable": false,
                    "sortable": false,
                    "render": function(data) {
                        var resIdEdit = "editReservation.html?id=" + data;
                        return '<a href="' + resIdEdit + '" class="editRes"><i class="fa fa-pencil fa-fw"></a>';
                    }
                },
                {
                    title: "Delete",
                    data: "id",
                    "searchable": false,
                    "sortable": false,
                    "render": function(data) {
                        var resIdEdit = "deleteReservation.html?id=" + data;
                        return '<a href="' + resIdEdit + '" class="deleteRes"><i class="fa fa-trash fa-fw"></a>';
                    }
                }
            ]
        });
    });
}