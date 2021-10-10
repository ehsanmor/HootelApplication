$(function() {

    getSpecificTypes();
    getAllGuests();

    $("#addNewGuest").click(function() {
        ClearModal("edit_guest_modal");
        document.getElementById("edit_guest_modal").hidden = false;
        document.getElementById("updateGuest").hidden = true;
        document.getElementById("saveNewGuest").hidden = false;
    });

    $('#guestsTable').on('click', 'tbody tr td button', function(e) {
        e.preventDefault();
        var table = $('#guestsTable').DataTable();
        let rowData = table.row($(this).parents('tr')).data();

        if ($(this).data('action') == "edit") {

            document.getElementById("edit_guest_modal").hidden = false;
            document.getElementById("updateGuest").hidden = false;
            document.getElementById("saveNewGuest").hidden = true;

            var selectedGuestType = rowData.type;
            $('#Id').val(rowData.id);
            $('#guestId').prop("readonly", true);
            $('#firstName').val(rowData.firstName);
            $('#lastName').val(rowData.lastName);
            $('#email').val(rowData.email);
            $('#password').val(rowData.password);
            $('#telephoneNumber').val(rowData.telephoneNumber);
            $('input:radio[name="guestType"]').filter('[value="' + selectedGuestType + '"]').attr('checked', true).prop('checked', true);
        } else if ($(this).data('action') == "delete") {
            var con = window.confirm("Are you sure you want to delete this guest?");
            if (con) {
                $.ajax({
                    url: 'http://localhost:8080/api/guest/',
                    type: 'DELETE',
                    contentType: 'application/json',
                    dataType: "json",
                    data: JSON.stringify(rowData),
                    success: function(status) {
                        reloadGuestData();
                    },
                    error: function(jqXHR, status, error) {
                        console.log(a, status, error);
                        var a = JSON.parse(jqXHR.responseText);
                        window.alert(jqXHR.status + " : " + a.message);
                    }
                });
            }
        }
    });

    // click on button update
    $("#updateGuest").on('click', function(e) {
        if (!validate()) return;
        e.preventDefault();
        var strType = "";
        var strType = $('input[name="guestType"]:checked').val();

        $.ajax({
            url: 'http://localhost:8080/api/guest/',
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
                type: strType
            }),
            success: function(result) {
                reloadGuestData();
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
    $("#saveNewGuest").on('click', function(e) {
        if (!validate()) return;
        e.preventDefault();
        var strType = "";
        var strType = $('input[name="guestType"]:checked').val();

        $.ajax({
            url: 'http://localhost:8080/api/guest/',
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
                type: strType
            }),
            success: function(result) {
                reloadGuestData();
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

function getAllGuests() {
    $.ajax({
        url: 'http://localhost:8080/api/guest/',
        type: 'GET',
        contentType: 'application/json',
        dataType: "json"
    }).done(function(data) {
        $('#guestsTable').dataTable({
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
                { data: "type", title: "Type" },
                //                { data: "numberOfReservation", title: "Number Of Reservation" },
                {
                    title: "Edit",
                    data: "null",
                    searchable: false,
                    sortable: false,
                    render: function(data, type, row) {
                        return '<button data-action="edit" class="editExistingGuest btn btn-sm btn-info" data-toggle="modal" data-target="#edit_guest_modal" data-id="' + row.id + '"><i class="fa fa-pencil fa-fw"></button>';
                    }
                },
                {
                    title: "Delete",
                    data: "null",
                    searchable: false,
                    sortable: false,
                    className: "dt-center",
                    render: function(data, type, row) {
                        return '<button data-action="delete" class="deleteGuest btn btn-sm btn-info" data-id="' + row.id + '"><i class="fa fa-trash fa-fw"></button>';
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
        for (var i = 0; i < grpWithItems["Guest"].length; i++) {
            radioHTML += '<div class="form-check"><input class="form-check-input" type="radio" name="guestType" value="' + grpWithItems["Guest"][i] + '" required><label class="form-check-label">' + grpWithItems["Guest"][i] + '</label></div><br>';
        }
        $("#guestTypesList").html(radioHTML);

    });
}

function reloadGuestData() {
    if ($.fn.dataTable.isDataTable('#guestsTable')) {
        $('#guestsTable').DataTable().destroy();
        $('#guestsTable').empty();
        document.getElementById("edit_guest_modal").hidden = true;
        getAllGuests();
    }
}