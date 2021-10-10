$(function() {
    $('#loginModal').modal('show');
    if (sessionStorage.getItem('Username') != null) {
        $("#loggedInUserName").text("Logged in : " + sessionStorage.getItem('Username'));
    }
    $('#loginModal').on('hidden.bs.modal', function(e) {
        includeBody('home');
    })

    $("#loginSubmit").click(function(e) {
        e.preventDefault(e);

        $('#invalid-login label').remove();
        var uEmail = "";
        var uPassword = "";
        uEmail = $('input[name=username]').val();
        uPassword = $('input[name=password]').val();
        checkUserLogin(uEmail, uPassword);
    });
})

function LoginLogoutClicked() {
    if (sessionStorage.getItem('Userrole') != null && $("#btnLogin").text() == "Logout") {
        sessionStorage.clear();
        $("#btnLogin").text('Login');
        $("#loggedInUserName").text("");
        location.href = 'http://localhost:8080/index.html';
        return;
    } else {
        includeBody('login');
    }
}

function checkUserLogin(email, password) {
    if (email == "") {
        $('#invalid-login').append('<label style="color: red;">' + "Please enter your email..." + '</label>');
        return;
    }
    if (password == "") {
        $('#invalid-login').append('<label style="color: red;">' + "Please enter your password..." + '</label>');
        return;
    }
    $.ajax({
        url: 'http://localhost:8080/api/employee/signin/',
        type: 'POST',
        contentType: 'application/json',
        dataType: "json",
        data: JSON.stringify({
            email: email,
            password: password
        }),
        success: function(result) {

            sessionStorage.setItem('Username', result.firstName + " " + result.lastName);
            sessionStorage.setItem('Userrole', result.role);
            sessionStorage.setItem('UserId', result.id);

            $("#btnLogin").text('Logout');
            $("#loggedInUserName").text("Logged in : " + sessionStorage.getItem('Username'));
            $('#loginModal').modal('hide');

            // Get saved data from sessionStorage
            let storedRole = sessionStorage.getItem('Userrole');
            ApplyUserRoles(storedRole);
        },
        error: function(jqXHR, status, error) {
            var a = JSON.parse(jqXHR.responseText);
            console.log(a, status, error);
            $('#invalid-login').append('<label style="color: red;">' + a.message + '</label>');
        }
    });
}

function ApplyUserRoles(userrole) {
    //    console.log(userrole);
    var menuBar = document.getElementById('myTopnav');
    $('#mnuRoom').attr("hidden", true).prop("hidden", true);
    $('#mnuReservation').attr("hidden", true).prop("hidden", true);
    $('#mnuEmployee').attr("hidden", true).prop("hidden", true);
    $('#mnuMaintain').attr("hidden", true).prop("hidden", true);
    $('#mnuTypeList').attr("hidden", true).prop("hidden", true);
    $('#mnuGuest').attr("hidden", true).prop("hidden", true);
    $('#mnuReport').attr("hidden", true).prop("hidden", true);
    switch (userrole) {
        case "Admin":
            $('#mnuMaintain').attr("hidden", false).prop("hidden", false);
            $('#mnuReport').attr("hidden", false).prop("hidden", false);
            //                    $('#mnuUserRole').attr("hidden", false).prop("hidden", false);
            break;
        case "Manager":
            $('#mnuRoom').attr("hidden", false).prop("hidden", false);
            $('#mnuEmployee').attr("hidden", false).prop("hidden", false);
            $('#mnuMaintain').attr("hidden", false).prop("hidden", false);
            $('#mnuTypeList').attr("hidden", false).prop("hidden", false);
            $('#mnuUserRole').attr("hidden", true).prop("hidden", true);
            $('#mnuReport').attr("hidden", false).prop("hidden", false);
            break;
        case "Receptionist":
            $('#mnuRoom').attr("hidden", false).prop("hidden", false);
            $('#mnuReservation').attr("hidden", false).prop("hidden", false);
            $('#mnuGuest').attr("hidden", false).prop("hidden", false);
            break;
        case "Cleaner":
            $('#mnuRoom').attr("hidden", false).prop("hidden", false);
            break;
        case "Guest":
            $('#mnuReservation').attr("hidden", false).prop("hidden", false);
            break;
    }
}