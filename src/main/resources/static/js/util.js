$(function() {
    includeBody("home");

    if (sessionStorage.getItem('Userrole') != null) {
        $("#btnLogin").text('Logout');
        $("#loggedInUserName span").text(sessionStorage.getItem('Username'));
        ApplyUserRoles(sessionStorage.getItem('Userrole'));
    } else {
        $("#btnLogin").innerHTML = "Login";
        $("#loggedInUser").innerHTML = "";
    }

    //        document.addEventListener('click', function(e) {
    //            if (e.target.tagName == "BUTTON") {
    //                if (sessionStorage.getItem('Userrole') == null) {
    //                    includeBody("login");
    //                }
    //            }
    //        });

    var $j = jQuery.noConflict();
    $j(".datePicker").datepicker();
    $j(".datePicker").datepicker("option", "dateFormat", "dd-mm-yy");
    $j(".datePicker").datepicker("option", "minDate", new Date());
});

function includeBody(bodyName) {
    sessionStorage.setItem('selectedPage', bodyName);
    if (sessionStorage.getItem('selectedPage') != "home") {
        bodyName = sessionStorage.getItem('selectedPage');
    }
    if (sessionStorage.getItem('Userrole') != null &&
        sessionStorage.getItem('selectedPage') != null) {
        bodyName = sessionStorage.getItem('selectedPage');
    }
    //    console.log(sessionStorage.getItem('selectedPage'), sessionStorage.getItem('Userrole'));

    document.getElementById("bodyContent").innerHTML = "";
    $("#bodyContent").load(bodyName + ".html");
    sessionStorage.setItem('selectedPage', bodyName);
}

function changeDateFormat(rawDate) {
    if (rawDate != null) {
        var parts = rawDate.split("-");
        var formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
        return formattedDate;
    } else {
        return null;
    }
}

function getFacilities() {
    var form = document.getElementById('facilityTypesList');
    var myArray = [];
    if (typeof form != 'undefined' && form != null) {
        form.querySelectorAll('input').forEach(function(input) {
            if (input.type === 'checkbox' && input.checked) {
                myArray.push(input.value);
            }
        })

        var roomFacilitiesList = document.getElementById('roomFacilities');
        if (typeof roomFacilitiesList != 'undefined' && roomFacilitiesList != null) {
            roomFacilitiesList.value = myArray.join(" | ");
        }
    }
    return myArray.join(" | ");
}

function showFacilities(facilities) {
    var form = document.getElementById('facilityTypesList');

    var myArray = [];
    myArray = facilities.toString().split('|');
    form.querySelectorAll('input').forEach(function(input) {
        if (input.type === 'checkbox') {
            input.checked = false;
            for (let i = 0, len = myArray.length; i < len; i++) {
                //        console.log(myArray[i]);
                if (input.value.toUpperCase() == myArray[i].trim().toUpperCase()) {
                    input.checked = true;
                }
            }
        }
    })
}

function StringToDate(dateStr) {
    var parts = dateStr.split("-");
    var newDateFormatted = new Date(parts[2], parts[1] - 1, parts[0]);
    finalDateFormatted = new Date(newDateFormatted.getTime() + Math.abs(newDateFormatted.getTimezoneOffset() * 60000));
    //    console.log(finalDateFormatted);
    return finalDateFormatted;
}

function ClearModal(modalId) {
    $(document.getElementById(modalId))
        .find("input[type=text],input[type=email],input[type=password],textarea,select")
        .val('')
        .end()
        .find("input[type=checkbox], input[type=radio]")
        .prop("checked", "")
        .end();
}

function validate() {
    var error = [];
    var arrNames = [];
    var form = document.getElementById('update_form');
    for (var i = 0; i < form.elements.length; i++) {
        arrNames.push(form.elements[i].name);

        if (form.elements[i].value === '' && form.elements[i].hasAttribute('required')) {
            if (form.elements[i].type === "radio" && !arrNames.includes(form.elements[i].name)) {
                alert('There are some required fields marked in red you have not filled!');
                console.log(form.elements[i].type);
                return false;
            }
            alert('There are some required fields marked in red you have not filled!');
            //            console.log(form.elements[i].type);
            return false;
        }
    }
    return true;
}