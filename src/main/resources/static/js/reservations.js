    $(function() {
        var loggedInEmployeeId = 0;
        var $j = jQuery.noConflict();
        $j(".datePicker").datepicker();
        $j(".datePicker").datepicker("option", "dateFormat", "dd-mm-yy");
        $j(".datePicker").datepicker("option", "minDate", new Date());
        if (sessionStorage.getItem('Userrole') != null) {
            document.getElementById("employeeId").innerText = sessionStorage.getItem('UserId');
            loggedInEmployeeId = parseInt(sessionStorage.getItem('UserId'));
        }

        $j(".datePicker").datepicker().on('change', function(ev) {
            var firstDate = "";
            var secondDate = "";
            if ($(this).attr('id') == "startDate") {
                firstDate = $(this).val();
                secondDate = $j("input#endDate.datePicker").datepicker().val();
                $j("input#endDate.datePicker").datepicker("option", "minDate", StringToDate(firstDate));
                $j("input#checkIn.datePicker").datepicker("option", "minDate", StringToDate(firstDate));
            }
            if ($(this).attr('id') == "endDate") {
                secondDate = $(this).val();
                firstDate = $j("input#startDate.datePicker").datepicker().val();
                $j("input#startDate.datePicker").datepicker("option", "maxDate", StringToDate(secondDate));
                $j("input#checkOut.datePicker").datepicker("option", "maxDate", StringToDate(secondDate));
            }
            if (firstDate != "" && secondDate != "") {
                ShowOnlyAvailableRooms(firstDate, secondDate);
            }
        });

        getGuests();
        //        getEmployees();

        getAllReservations();

        $("#addNewReservation").click(function() {
            ClearModal("edit_reservation_modal");
            document.getElementById("edit_reservation_modal").hidden = false;
            document.getElementById("updateReservation").hidden = true;
            document.getElementById("saveNewReservation").hidden = false;
            document.getElementById("labelSelectedRooms").innerText = "";
            document.getElementById("roomId").innerText = "";
            strRoomsList = "";
            strRoomIds = "";
            intRoomSize = 0;
        });

        $("#btnClearRoomList").click(function() {
            document.getElementById("labelSelectedRooms").innerText = "";
            document.getElementById("roomId").innerText = "";
            strRoomsList = "";
            strRoomIds = "";
            intRoomSize = 0;
        });

        var strRoomsList = "";
        var strRoomIds = "";
        var intRoomSize = 0;
        $("#roomsList").change(function() {

            document.getElementById("labelSelectedRooms").innerText = "";
            document.getElementById("roomId").innerText = "";
            strRoomsList += "," + $(this).find(":selected").data('roomno');
            intRoomSize += parseInt($(this).find(":selected").data('capacity'));
            strRoomIds += "," + $(this).val();
            document.getElementById("labelSelectedRooms").innerText = strRoomsList.substr(1);
            document.getElementById("labelSelectedRooms").innerText = strRoomsList.substr(1) + " Total Capacity: " + intRoomSize;
            document.getElementById("roomId").innerText = strRoomIds.substr(1);
            $(this).css("box-shadow", 'none');
        });

        //        $("#employeesList").change(function() {
        //            var employeeId = $(this).val();
        //            document.getElementById("employeeId").innerText = employeeId;
        //
        //            $(this).css("box-shadow", 'none');
        //        });

        $("#guestsList").change(function() {
            var guestId = $(this).val();
            document.getElementById("guestId").innerText = guestId;
            $(this).css("box-shadow", 'none');
        });

        $('#reservationsTable').on('click', 'tbody tr td button', function(e) {
            e.preventDefault();
            var table = $('#reservationsTable').DataTable();
            let rowData = table.row($(this).parents('tr')).data();
            var strRoomIds = "";
            var strRoomNos = "";
            var objReservedRooms = rowData.reservedRooms;
            $.each(objReservedRooms, function(key, value) {
                strRoomIds += "," + value.id;
                strRoomNos += "," + value.roomNo;
            });

            if ($(this).data('action') == "edit") {

                document.getElementById("edit_reservation_modal").hidden = false;
                document.getElementById("updateReservation").hidden = false;
                document.getElementById("saveNewReservation").hidden = true;

                var selectedPaymentType = rowData.paymentType;
                $('#Id').val(rowData.id);
                $('#reservationId').prop("readonly", true);
                $('#reservationId').val(rowData.id);
                document.getElementById("labelSelectedRooms").innerText = strRoomNos.substr(1);
                document.getElementById("roomId").innerText = strRoomIds.substr(1);
                $('#guestId').val(rowData.guest['id']);
                $('#guestsList>option:eq(' + rowData.guest['id'] + ')').prop('selected', true);
                $('#startDate').val(changeDateFormat(rowData.startDate));
                $('#endDate').val(changeDateFormat(rowData.endDate));
                $('#checkIn').val(changeDateFormat(rowData.checkIn));
                $('#checkOut').val(changeDateFormat(rowData.checkOut));
                $('#price').val(rowData.price);
                $('#additionalPrice').val(rowData.additionalPrice);
                $('#noOfPeople').val(rowData.noOfPeople);
                $('input:radio[name="paymentType"]').filter('[value="' + selectedPaymentType + '"]').attr('checked', true).prop('checked', true);
                $('#paymentDate').val(changeDateFormat(rowData.paymentDate));
                $('#employeeId').val(rowData.employee['id']);
                //                $('#employeesList>option:eq(' + rowData.employee['id'] + ')').prop('selected', true);
            } else if ($(this).data('action') == "delete") {
                var con = window.confirm("Are you sure you want to delete this reservation?");
                if (con) {
                    $.ajax({
                        url: 'http://localhost:8080/api/reservation/',
                        type: 'DELETE',
                        contentType: 'application/json',
                        dataType: "json",
                        data: JSON.stringify(rowData),
                        success: function(status) {
                            setTimeout(document.getElementById('btnClose').click(), 1000);
                            reloadReservationData();
                        },
                        error: function(e) {
                            console.log("Something went wrong " + e);
                        },
                    });
                }
            } else {
                $('#reservationId').prop("readonly", false);
            }
        });


        // click on button update
        $("#updateReservation").on('click', function(e) {
            if (!validate()) return;
            e.preventDefault(e);
            if ($("#noOfPeople").val() > intRoomSize) {
                window.alert("Please make sure the no of people does not exceed the room capacity.");
                return;
            }
            var selectedRooms = document.getElementById("roomId").innerText;
            var selectedRooms = selectedRooms.split(",");
            //        console.log(document.getElementById("roomId").innerText, $("#roomId").val(), selectedRooms);
            var selectedRoomsArr = [];
            $.each(selectedRooms, function(index, value) {
                var singleItem = {};
                singleItem["id"] = parseInt(value);
                selectedRoomsArr.push(singleItem);
            });
            //        console.log( selectedRoomsArr );

            var strType = $('input[name="paymentType"]:checked').val();
            var objectTest = JSON.stringify({
                id: $("#reservationId").val(),
                reservedRooms: selectedRoomsArr,
                //                         reservedRooms: [{id: parseInt($("#roomId").val())}],
                guest: { id: $('#guestsList').find(":selected").val() },
                startDate: StringToDate($('#startDate').val()),
                endDate: StringToDate($('#endDate').val()),
                checkIn: StringToDate($('#checkIn').val()),
                checkOut: StringToDate($('#checkOut').val()),
                price: $('#price').val(),
                additionalPrice: $('#additionalPrice').val(),
                noOfPeople: $('#noOfPeople').val(),
                paymentType: strType,
                paymentDate: StringToDate($('#paymentDate').val()),
                employee: { id: loggedInEmployeeId }
            });
            //                console.log(objectTest);
            $.ajax({
                url: 'http://localhost:8080/api/reservation/',
                type: 'PUT',
                contentType: 'application/json',
                dataType: "json",
                data: objectTest,
                success: function(result) {
                    window.alert("The reservation was successfully updated.");
                    reloadReservationData();
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
        $("#saveNewReservation").on('click', function(e) {
            if (!validate()) return;
            e.preventDefault();
            if ($("#noOfPeople").val() > intRoomSize) {
                window.alert("Please make sure the no of people does not exceed the room capacity.");
                return;
            }
            var selectedRooms = document.getElementById("roomId").innerText;
            var selectedRooms = selectedRooms.split(",");
            //        console.log(document.getElementById("roomId").innerText, $("#roomId").val(), selectedRooms);
            var selectedRoomsArr = [];
            $.each(selectedRooms, function(index, value) {
                var singleItem = {};
                singleItem["id"] = parseInt(value);
                selectedRoomsArr.push(singleItem);
            });

            var strType = $('input[name="paymentType"]:checked').val();
            var objectTest = JSON.stringify({
                //            id: $("#reservationId").val(),
                reservedRooms: selectedRoomsArr,
                guest: { id: $('#guestsList').find(":selected").val() },
                startDate: StringToDate($('#startDate').val()),
                endDate: StringToDate($('#endDate').val()),
                checkIn: StringToDate($('#checkIn').val()),
                checkOut: StringToDate($('#checkOut').val()),
                price: $('#price').val(),
                additionalPrice: $('#additionalPrice').val(),
                noOfPeople: $('#noOfPeople').val(),
                paymentType: strType,
                paymentDate: StringToDate($('#paymentDate').val()),
                employee: { id: loggedInEmployeeId }
            });
            //            console.log(loggedInEmployeeId);
            $.ajax({
                url: 'http://localhost:8080/api/reservation/',
                type: 'POST',
                contentType: 'application/json',
                dataType: "json",
                data: objectTest,
                success: function(result) {
                    window.alert("New reservation successfully added.");
                    reloadReservationData();
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

    function ShowOnlyAvailableRooms(startDate, endDate) {
        var arrRoomsReserved = [];
        var startDate = new Date(StringToDate(startDate));
        var endDate = new Date(StringToDate(endDate));
        //    console.log(startDate, endDate);
        $.ajax({
            url: 'http://localhost:8080/api/reservation/',
            type: 'GET',
            contentType: 'application/json',
            dataType: "json"
        }).done(function(data) {
            var strReservedRooms = [];
            $.each(data, function(key, value) {
                $.each(value.reservedRooms, function(k, v) {
                    strReservedRooms.push({ room: v.id, from: new Date(value.startDate), to: new Date(value.endDate) });
                });
            });
            strReservedRooms.forEach(function(arrayItem) {
                if (!((startDate < arrayItem.from && endDate < arrayItem.from) || (startDate > arrayItem.to && endDate > arrayItem.to))) {
                    //                        console.log("Start dates: " + arrayItem.room, arrayItem.from, startDate);
                    //                        console.log("End dates: " + arrayItem.room, arrayItem.to, endDate);
                    arrRoomsReserved.push(arrayItem.room);
                    //                        console.log(arrRoomsReserved, startDate > arrayItem.from, endDate < arrayItem.from);
                }
            });
            getRoomsInList(arrRoomsReserved);
        });
        //reset datepicker
        var $j = jQuery.noConflict();
        $j(".datePicker").datepicker();
        $j(".datePicker").datepicker("option", "dateFormat", "dd-mm-yy");
        $j(".datePicker").datepicker("option", "minDate", new Date());
        $j(".datePicker").datepicker("option", "maxDate", new Date(2021, 12, 31));
    };

    function getGuests() {
        $.getJSON('http://localhost:8080/api/guest/', function(result) {
            var ele = document.getElementById('guestsList');

            ele.innerHTML = ele.innerHTML +
                '<option value=""> Select guest...</option>';
            for (var i = 0; i < result.length; i++) {
                // POPULATE SELECT ELEMENT WITH JSON.
                ele.innerHTML = ele.innerHTML +
                    '<option value="' + result[i]['id'] + '">' + result[i]['firstName'] + " " + result[i].lastName + '</option>';
            }

        });
    }

    //    function getEmployees() {
    //        $.getJSON('http://localhost:8080/api/employee/', function(result) {
    //            var ele = document.getElementById('employeesList');
    //
    //            ele.innerHTML = '<option value=""> Select employee...</option>';
    //            for (var i = 0; i < result.length; i++) {
    //                // POPULATE SELECT ELEMENT WITH JSON.
    //                ele.innerHTML = ele.innerHTML +
    //                    '<option value="' + result[i]['id'] + '">' + result[i]['firstName'] + " " + result[i].lastName + '</option>';
    //            }
    //
    //        });
    //    }

    function getLengthAddSpace(strText, lenColumn) {
        var strSpaces = "";
        if (strText != "") {
            var lenString = 0;
            lenString = $.trim(strText).length;
            for (i = 1; i <= (lenColumn - lenString); i++) {
                strSpaces += "&nbsp;"
            }
            strText = strText + strSpaces;
            //            console.log(strText, lenString, lenColumn);
            //            &emsp;
        }
        return strText;
    }

    function getRoomsInList(arrRoomsReserved) {
        $.getJSON('http://localhost:8080/api/room/', function(result) {
            var ele = document.getElementById('roomsList');

            ele.innerHTML = '<option value=""> Select room or multiple rooms here ...</option>';
            ele.innerHTML = ele.innerHTML + '<option value="">' +
                getLengthAddSpace('Room No', 10) + "|" +
                getLengthAddSpace('Type', 25) + "|" +
                getLengthAddSpace('Facilities', 30) + "|" +
                getLengthAddSpace('Price/Night', 20) + "|" +
                getLengthAddSpace('Capacity', 20) + '</option>';

            for (var i = 0; i < result.length; i++) {
                if (!arrRoomsReserved.includes(result[i]['id'])) {
                    // POPULATE SELECT ELEMENT WITH JSON.
                    ele.innerHTML = ele.innerHTML +
                        '<option class="roomsListOption" data-roomno="' + result[i]['roomNo'] + '" data-capacity="' + result[i]['capacity'] + '" value="' + result[i]['id'] + '">' +
                        getLengthAddSpace(String(result[i].roomNo), 15) + "|" +
                        getLengthAddSpace(result[i].type, 20) + "|" +
                        getLengthAddSpace(result[i].facilities.replaceAll("|", ","), 30) + "|" +
                        getLengthAddSpace(result[i].price, 20) + "|" +
                        getLengthAddSpace(result[i].capacity, 20) + '</option>';
                }
            }

        });
    }

    function getAllReservations() {
        $.ajax({
            url: 'http://localhost:8080/api/reservation/',
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
                    },
                    {
                        title: "Edit",
                        data: "null",
                        searchable: false,
                        sortable: false,
                        render: function(data, type, row) {
                            return '<button data-action="edit" class="editExistingReservation btn btn-sm btn-info" data-toggle="modal" data-target="#edit_reservation_modal" data-id="' + row.id + '"><i class="fa fa-pencil fa-fw"></button>';
                        }
                    },
                    {
                        title: "Delete",
                        data: "id",
                        searchable: false,
                        sortable: false,
                        className: "dt-center",
                        render: function(data, type, row) { //
                            //                        var resIdDelete = 'return DeleteRow(' + data + ');';
                            return '<button data-action="delete" class="deleteRes btn btn-sm btn-info" data-id="' + row.id + '"><i class="fa fa-trash fa-fw"></button>';
                            //                        return '<a href="#" class="btn btn-sm btn-info deleteRes" onclick="' + resIdDelete + '"><i class="fa fa-trash fa-fw"></a>';
                        }
                    }
                ]
            });
        });
    }

    function reloadReservationData() {
        if ($.fn.dataTable.isDataTable('#reservationsTable')) {
            $('#reservationsTable').DataTable().destroy();
            $('#reservationsTable').empty();
            document.getElementById("edit_reservation_modal").hidden = true;
            getAllReservations();
        }
    }