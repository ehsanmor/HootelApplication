$(function() {
    getAllUserroles();
});

function getAllUserroles() {
    $.ajax({
        url: 'http://localhost:8080/api/userroles/',
        userrole: 'GET',
        contentUserrole: 'application/json',
        dataUserrole: "json"
    }).done(function(data) {
        $('#userRolesTable').dataTable({
            order: [
                [1, "asc"]
            ],
            data: data,
            columns: [
                { data: "id", title: "id", visible: false },
                { data: "roleName", title: "User Role" },
                { data: "room", title: "Rooms" },
                { data: "reservation", title: "Reservations" },
                { data: "guest", title: "Guests" },
                { data: "employee", title: "Employees" },
                { data: "typeList", title: "Type List" },
                { data: "userRoles", title: "User roles" }
            ]
        });
    });
}