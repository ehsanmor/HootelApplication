$(function() {

    getSpecificTypes();
    getAllEmployees();

    $("#addNewEmployee").click(function() {
        ClearModal("edit_employee_modal");
        document.getElementById("edit_employee_modal").hidden = false;
        document.getElementById("updateEmployee").hidden = true;
        document.getElementById("saveNewEmployee").hidden = false;
    });

    $('#employeesTable').on('click', 'tbody tr td button', function(e) {
        e.preventDefault();
        var table = $('#employeesTable').DataTable();
        let rowData = table.row($(this).parents('tr')).data();

        if ($(this).data('action') == "edit") {
            // change the save button to update
            document.getElementById("edit_employee_modal").hidden = false;
            document.getElementById("updateEmployee").hidden = false;
            document.getElementById("saveNewEmployee").hidden = true;

            var selectedEmployeeRole = rowData.role;
            $('#Id').val(rowData.id);
            $('#employeeId').prop("readonly", true);
            $('#firstName').val(rowData.firstName);
            $('#lastName').val(rowData.lastName);
            $('#email').val(rowData.email);
            $('#password').val(rowData.password);
            $('#telephoneNumber').val(rowData.telephoneNumber);
            $('input:radio[name="employeeRole"]').filter('[value="' + selectedEmployeeRole + '"]').attr('checked', true).prop('checked', true);
        } else if ($(this).data('action') == "delete") {
            var con = window.confirm("Are you sure you want to delete this employee?");
            if (con) {
                $.ajax({
                    url: 'http://localhost:8080/api/employee/',
                    type: 'DELETE',
                    contentType: 'application/json',
                    dataType: "json",
                    data: JSON.stringify(rowData),
                    success: function(status) {
                        reloadEmployeeData();
                    },
                    error: function(jqXHR, status, error) {
                        var a = JSON.parse(jqXHR.responseText);
                        console.log(a, status, error);
                        window.alert(jqXHR.status + " : " + a.message);
                    }
                });
            }
        }
    });

    // click on button update
    $("#updateEmployee").on('click', function(e) {
        if (!validate()) return;
        e.preventDefault();
        var strRole = $('input:radio[name="employeeRole"]:checked').val();

        $.ajax({
            url: 'http://localhost:8080/api/employee/',
            type: 'PUT',
            contentType: 'application/json',
            dataType: "json",
            data: JSON.stringify({
                id: $("#Id").val(),
                firstName: $("#firstName").val(),
                lastName: $('#lastName').val(),
                email: $('#email').val(),
                password: $('#password').val(),
                telephoneNumber: $('#telephoneNumber').val(),
                role: strRole
            }),
            success: function(result) {
                reloadEmployeeData();
                setTimeout(document.getElementById('btnClose').click(), 1000);
            },
            error: function(jqXHR, status, error) {
                var a = JSON.parse(jqXHR.responseText);
                console.log(a, status, error);
                window.alert(jqXHR.status + " : " + a.message);
            }
        });
    });

    // click on button update
    $("#saveNewEmployee").on('click', function(e) {
        if (!validate()) return;
        e.preventDefault();
        var strRole = $('input:radio[name="employeeRole"]:checked').val();
        $.ajax({
            url: 'http://localhost:8080/api/employee/',
            type: 'POST',
            contentType: 'application/json',
            dataType: "json",
            data: JSON.stringify({
                //                    id: $("#Id").val(),
                firstName: $("#firstName").val(),
                lastName: $('#lastName').val(),
                email: $('#email').val(),
                password: $('#password').val(),
                telephoneNumber: $('#telephoneNumber').val(),
                role: strRole
            }),
            success: function(result) {
                reloadEmployeeData();
                setTimeout(document.getElementById('btnClose').click(), 1000);
            },
            error: function(jqXHR, status, error) {
                var a = JSON.parse(jqXHR.responseText);
                console.log(a, status, error);
                window.alert(jqXHR.status + " : " + a.message);
            }
        });
    });
});

function getAllEmployees() {
    $.ajax({
        url: 'http://localhost:8080/api/employee/',
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
                { data: "role", title: "Role" },
                //                { data: "numberOfReservation", title: "Number Of Reservation" },
                {
                    title: "Edit",
                    data: "null",
                    searchable: false,
                    sortable: false,
                    render: function(data, type, row) {
                        return '<button data-action="edit" class="editExistingEmployee btn btn-sm btn-info" data-toggle="modal" data-target="#edit_employee_modal" data-id="' + row.id + '"><i class="fa fa-pencil fa-fw"></button>';
                    }
                },
                {
                    title: "Delete",
                    data: "null",
                    searchable: false,
                    sortable: false,
                    className: "dt-center",
                    render: function(data, type, row) {
                        return '<button data-action="delete" class="deleteEmployee btn btn-sm btn-info" data-id="' + row.id + '"><i class="fa fa-trash fa-fw"></button>';
                    }
                }
            ]
        });
    });
}

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
        for (var i = 0; i < grpWithItems["Employee"].length; i++) {
            radioHTML += '<div class="form-check"><input class="form-check-input" type="radio" name="employeeRole" value="' + grpWithItems["Employee"][i] + '" required><label class="form-check-label">' + grpWithItems["Employee"][i] + '</label></div><br>';
        }
        $("#employeeRolesList").html(radioHTML);

    });
}

function reloadEmployeeData() {
    if ($.fn.dataTable.isDataTable('#employeesTable')) {
        $('#employeesTable').DataTable().destroy();
        $('#employeesTable').empty();
        document.getElementById("edit_employee_modal").hidden = true;
        getAllEmployees();
    }
}