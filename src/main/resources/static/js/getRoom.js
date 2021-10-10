$(document).ready(function() {

    $('#roomTable').on('click', 'tbody tr td button', function(e) {
        e.preventDefault();
        var table = $('#roomTable').DataTable();
        let rowData = table.row($(this).parents('tr')).data();

        if ($(this).data('action') == "edit") {
            document.getElementById("edit_room_modal").hidden = false;
            document.getElementById("updateRoom").hidden = false;
            document.getElementById("saveNewRoom").hidden = true;

            var selectedRoomType = rowData.type;
            $('#Id').val(rowData.id);
            $('#roomId').prop("readonly", true);
            $('#roomId').val(rowData.roomNo);
            $('input:radio[name="roomType"]').filter('[value="' + selectedRoomType + '"]').attr('checked', true).prop('checked', true);
            $('#roomSize').val(rowData.capacity);
            $('#roomPrice').val(rowData.price);
            $('#roomLastBigClean').val(changeDateFormat(rowData.lastBigCleaningDate));
            $('#roomBigCleanAfterInDays').val(rowData.numberOfDaysAfterBigClean);
            var selId = document.getElementById("roomUnderConstruction");
            selId.value = rowData.underConstruction ? "true" : "false";
            showFacilities(rowData.facilities.toString());
        } else if ($(this).data('action') == "delete") {
            var con = window.confirm("Are you sure you want to delete this room?");
            if (con) {
                $.ajax({
                    url: 'http://localhost:8080/api/room/',
                    type: 'DELETE',
                    contentType: 'application/json',
                    dataType: "json",
                    data: JSON.stringify(rowData),
                    success: function(status) {
                        reloadData();
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
    $("#updateRoom").on('click', function(e) {
        if (!validate()) return;
        e.preventDefault();
        var arrFacilities = getFacilities();
        var strType = $('input[name="roomType"]:checked').val();
        var underConst = $('#roomUnderConstruction option:selected').val();

        $.ajax({
            url: 'http://localhost:8080/api/room/',
            type: 'PUT',
            contentType: 'application/json',
            dataType: "json",
            data: JSON.stringify({
                id: $("#Id").val(),
                roomNo: $("#roomId").val(),
                capacity: $('#roomSize').val(),
                price: $('#roomPrice').val(),
                type: strType,
                facilities: arrFacilities,
                underConstruction: underConst,
                lastBigCleaningDate: StringToDate($('#roomLastBigClean').val()),
                numberOfDaysAfterBigClean: $('#roomBigCleanAfterInDays').val()
            }),
            success: function(result) {
                reloadRoomsData();
            },
            error: function(jqXHR, status, error) {
                var a = JSON.parse(jqXHR.responseText);
                console.log(a, status, error);
                window.alert(jqXHR.status + " : " + a.message);
            }
        });
    });

    // click on button submit
    $("#saveNewRoom").on('click', function(e) {
        if (!validate()) return;
        e.preventDefault();
        var arrFacilities = getFacilities();
        var strType = $('input[name="roomType"]:checked').val();
        var underConst = $('#roomUnderConstruction option:selected').val();

        $.ajax({
            url: 'http://localhost:8080/api/room/',
            type: 'POST',
            contentType: 'application/json',
            dataType: "json",
            data: JSON.stringify({
                roomNo: $("#roomId").val(),
                capacity: $('#roomSize').val(),
                price: $('#roomPrice').val(),
                type: strType,
                facilities: arrFacilities,
                underConstruction: underConst,
                lastBigCleaningDate: $('#roomLastBigClean').val(),
                numberOfDaysAfterBigClean: $('#roomBigCleanAfterInDays').val()
            }),
            success: function(result) {
                //                console.log(result);
                //                window.confirm("The new room is successfully added.");
                reloadRoomsData();
                //                setTimeout($('#edit_room_modal').modal('hide'), 1500);
                //                setTimeout("$('#messageLabel').html('');", 2000);
                //                setTimeout("location.href = 'http://localhost:8080/rooms.html';", 3000);
            },
            error: function(jqXHR, status, error) {
                var a = JSON.parse(jqXHR.responseText);
                console.log(a, status, error);
                window.alert(jqXHR.status + " : " + a.message);
            }
        });
    });

    //    function getRoomById(id) {
    //        $.ajax({
    //            url: 'http://localhost:8080/api/room/' + id,
    //            type: 'GET',
    //            contentType: 'application/json',
    //            dataType: "json",
    //        }).done(function(data) {
    //            //            console.log(data.roomType);
    //            $('#roomId').val(data.id);
    //            var selectedRoomType = data.type.toLowerCase();
    //            $('input:radio[name="roomType"]').filter('[value="' + selectedRoomType + '"]').attr('checked', true);
    //            $('#roomSize').val(data.capacity);
    //            $('#roomPrice').val(data.price);
    //            $('#roomLastBigClean').val(data.lastBigCleaningDate);
    //            $('#roomBigCleanAfterInDays').val(data.numberOfDaysAfterBigClean);
    //            var selId = document.getElementById("roomUnderConstruction");
    //            selId.value = data.underConstruction ? "true" : "false";
    //            showFacilities(data.facilities.toString());
    //        });
    //    }
});