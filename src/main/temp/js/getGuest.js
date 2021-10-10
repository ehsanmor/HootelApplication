$(document).ready(function() {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    if (id !== null) getGuestById(id);

    function getGuestById(id) {
        $.ajax({
            url: 'http://localhost:8080/hotel/guest/' + id,
            type: 'GET',
        }).done(function(data) {

            $('#guestId').val(data.id);
            $('#firstName').val(data.firstName);
            $('#lastName').val(data.lastName);
            var selectedGuestType = data.type.toLowerCase();
            $('input:radio[name="type"]').filter('[value="' + selectedGuestType + '"]').attr('checked', true);
            $('#email').val(data.email);
            $('#password').val(data.password);
            $('#telephoneNumber').val(data.telephoneNumber);
            $('#numberOfReservation').val(data.numberOfReservation);

        });
    }

    // click on button submit
    $("#updateGuest").on('click', function() {

        $.ajax({
            url: 'http://localhost:8080/hotel/guest/edit/' + id,
            type: 'PUT',
            contentType: 'application/json',
            dataType: "json",
            data: JSON.stringify({

                "firstName": $('#firstName').val(),
                "lastName": $('#lastName').val(),
                "email": $('#email').val(),
                "password": $('#password').val(),
                "telephoneNumber": $('#telephoneNumber').val(),
                "type": $('input[name="type"]:checked').val(),
                "numberOfReservation": $('#numberOfReservation').val()
            }),
            success: function(result) {
                $("#messageLabel").html("Your changes were successfully saved.");
                setTimeout("$('#messageLabel').html('');", 3000);
                setTimeout("location.href = 'http://localhost:8080/guests.html';", 5000);
            },
            error: function(e) {
                console.log(e);
            }
        });
    });

});