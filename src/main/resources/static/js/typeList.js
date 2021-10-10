$(function() {
    getAllTypes();

    $("#addNewType").click(function() {
        document.getElementById("edit_type_modal").hidden = false;
        document.getElementById("updateType").hidden = true;
        document.getElementById("saveNewType").hidden = false;
    });

    if (document.querySelector(".editExistingType") != null) {
        document.querySelector(".editExistingType").click(function() {
            document.getElementById("updateType").hidden = false;
            document.getElementById("saveNewType").hidden = true;
        });
    }

    $('.filterTypes').on('click', function() {
        var table = $('#typeTable').DataTable();
        $(".filterTypes").css('background-color', '#3BB0C1');
        $(this).css('background-color', '#327D83');
        //    console.log($(this).prop("name"));
        table
            .columns(1)
            .search($(this).prop("name"))
            .draw();
    });

    $("#saveNewType").on('click', function() {
        var groupingSelected = $('#grouping option:selected').val();

        $.ajax({
            url: 'http://localhost:8080/api/typeList/',
            type: 'POST',
            contentType: 'application/json',
            dataType: "json",
            data: JSON.stringify({
                grouping: groupingSelected,
                typeName: $('#typeListName').val()
            }),
            success: function(result) {
                //                console.log(result);
                window.confirm("It is successfully added to the list.");
                setTimeout("$('#messageLabel').html('');", 1000);
                setTimeout("location.href = 'http://localhost:8080/typeList.html';", 1500);
            },
            error: function(e) {
                console.log(e);
            },
        });
    });
});

function getAllTypes() {
    $.ajax({
        url: 'http://localhost:8080/api/typeList/',
        type: 'GET',
        contentType: 'application/json',
        dataType: "json"
    }).done(function(data) {
        $('#typeTable').dataTable({
            order: [
                [1, "asc"]
            ],
            data: data,
            columns: [
                { data: "id", title: "id", visible: false },
                { data: "grouping", title: "Type of" },
                { data: "typeName", title: "Description" },
                {
                    title: "Edit",
                    data: "null",
                    searchable: false,
                    sortable: false,
                    render: function(data, type, row) {
                        return '<button data-action="edit" class="editExistingType btn btn-sm btn-info" data-toggle="modal" data-target="#edit_type_modal" data-id="' + row.id + '"><i class="fa fa-pencil fa-fw"></button>';
                    }
                },
                {
                    title: "Delete",
                    data: "null",
                    searchable: false,
                    sortable: false,
                    className: "dt-center",
                    render: function(data, type, row) {
                        return '<button data-action="delete" class="deleteType btn btn-sm btn-info" data-id="' + row.id + '"><i class="fa fa-trash fa-fw"></button>';
                    }
                }
            ]
        });
    });
}