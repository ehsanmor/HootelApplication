$(function() {

    getAllEmployees();
});

function getAllEmployees() {
    $.ajax({
        url: 'http://localhost:8080/hotel/employees',
        type: 'GET',
        contentType: 'application/json',
        dataType: "json"
    }).done(function(data) {
        $('#employeesTable').dataTable({
            order: [
                [0, "asc"]
            ],
            data: data,
            columns: [

                { data: "id", title: "Id" },
                { data: "firstName", title: "First Name" },
                { data: "lastName", title: "Last Name" },
                { data: "email", title: "Email" },
                {
                    data: "password",
                    title: "Password",
                    render: function(data) {
                        return "*********";
                    }
                },
                { data: "telephoneNumber", title: "Telephone Number" },
                { data: "role", title: "role" },
                {
                    title: "Edit",
                    data: "id",
                    "searchable": false,
                    "sortable": false,
                    "render": function(data) {
                        var resIdEdit = "editemployee.html?id=" + data;
                        return '<a href="' + resIdEdit + '" class="editEmployee"><i class="fa fa-pencil fa-fw"></a>';
                    }
                },
                {
                    title: "Delete",
                    data: "id",
                    "searchable": false,
                    "sortable": false,
                    "render": function(data) {
                        var resIdEdit = "deleteemployee.html?id=" + data;
                        return '<a href="' + resIdEdit + '" class="deleteEmployee"><i class="fa fa-trash fa-fw"></a>';
                    }
                }
            ]
        });
    });
}