$(function () {

    getAllGuests();
});

function getAllGuests() {
    $.ajax({
        url: 'http://localhost:8080/hotel/guests',
        type: 'GET',
        contentType: 'application/json',
        dataType: "json"
    }).done(function (data) {
        $('#guestsTable').dataTable({
            order: [[ 0, "asc" ]],
            data: data,
            columns: [
                { data: "id", title: "Id" },
                { data: "firstName", title: "First Name" },
                { data: "lastName", title: "Last Name" },
                { data: "email", title: "Email" },
                { data: "password",
                  title: "Password",
                  render: function (data) {
                          return "*********";
                        }
                 },
                { data: "telephoneNumber", title: "Telephone Number" },
                { data: "type", title: "Type"},
                { data: "numberOfReservation", title: "Number Of Reservation"},
                {
                    title: "Edit",
                    data: "id",
                    "searchable": false,
                    "sortable": false,
                    "render": function (data) {
                        var resIdEdit = "editguest.html?id=" + data;
                        return '<a href="' + resIdEdit + '" class="editGuest"><i class="fa fa-pencil fa-fw"></a>';
                    }
                },
                {
                    title: "Delete",
                    data: "id",
                    "searchable": false,
                    "sortable": false,
                    "render": function (data) {
                        var resIdEdit = "deleteguest.html?id=" + data;
                        return '<a href="' + resIdEdit + '" class="deleteGuest"><i class="fa fa-trash fa-fw"></a>';
                    }
                }
            ]
        });
    });
}