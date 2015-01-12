WARANA.namespace("module.processResume");

WARANA.module.processResume = function () {
    var fileName = null;
    var row = null;

    var selectAll = function () {
        if (this.checked) {
            $('.files-checkbox').each(function () {
                this.checked = true;
            });
        } else {
            $('.files-checkbox').each(function () {
                this.checked = false;
            });
        }
    };

    var setFileListDataTable = function () {
        $("#unprocessed-resume-list").dataTable(
            {
                "bSort": false
            }
        );
    };

    var deleteResumeConfirmation = function () {
        fileName = $(this).closest('tr').children('td:eq(1)').text();
        row = $(this).closest('tr').first();

        var title = "Delete Confirmation";
        var msg = "Are you sure want to delete this CV?";
        WARANA.deleteConfirmation(deleteResumeRow, title, msg);
    };

    var deleteResumeRow = function () {
        var nRow = row[0];

        var ajaxInitData = {
            url: "process/delete",
            data: $.toJSON(fileName),
            contentType: "application/json"
        };

        var successFn = function (result) {
            if (result) {
                $("#unprocessed-resume-list").dataTable().fnDeleteRow(nRow);
                WARANA.message(WARANA.messageType.SUCCESS, "Successfully deleted");
            } else {
                WARANA.message(WARANA.messageType.ERROR, "Error has occurred");
            }
        };

        WARANA.common.ajaxCall(ajaxInitData, successFn);

    };

    var processResumes = function () {
        var selected = [];
        $('.files-checkbox:checked').each(function () {
            selected.push($(this).closest('tr').children('td:eq(1)').text());
        });

        var ajaxInitData = {
            url: 'process/processlist',
            data: JSON.stringify(selected),
            contentType: "application/json"
        };

        var successFn = function (result) {
            if (result) {
                WARANA.successMessageWithCallBack(loadAnalyzePage, "All CVs successfully processed");
            } else {
                WARANA.message(WARANA.messageType.ERROR, "Error has occurred");
            }
        };

        WARANA.common.ajaxCall(ajaxInitData, successFn);
    };

    var loadAnalyzePage = function () {
        location.href = "/warana/analyze";
    };

    return {
        init: function () {
            setFileListDataTable();
            $(document).on("click", "#select-all", selectAll);
            $(document).on("click", ".delete-resume", deleteResumeConfirmation);
            $(document).on("click", "#process-resume", processResumes);
        }
    }
}();

$(function () {
    WARANA.module.processResume.init();
});