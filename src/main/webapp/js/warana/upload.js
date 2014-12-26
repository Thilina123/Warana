WARANA.namespace("module.uploadCv");

WARANA.module.uploadCv = function () {
    var previewNode = null;
    var previewTemplate = null;
    var myDropzone = null;

    var initialize = function () {
        previewNode = document.querySelector("#template");
        previewNode.id = "";
        previewTemplate = previewNode.parentNode.innerHTML;
        previewNode.parentNode.removeChild(previewNode);

        myDropzone = new Dropzone(document.body, { // Make the whole body a dropzone
            url: "fileupload", // Set the url
            thumbnailWidth: 80,
            thumbnailHeight: 80,
            parallelUploads: 20,
            previewTemplate: previewTemplate,
            previewsContainer: "#previews", // Define the container to display the previews
            autoProcessQueue: false,
            clickable: "#add-files",
            success: function(file, response){
                var status = response.status;
                var errorString = "";
                var notifications_div = document.getElementById("notification-div");

                if (status == "false"){
                    var fileNames = response.files;
                    for (var a = 0; a < fileNames.length; a++){
                        errorString = errorString.concat(fileNames[a]+ ",");
                    }

                    notifications_div.className = "alert alert-danger";
                    notifications_div.innerHTML = "Error Occurred. Files " + errorString + " Could Not Save to Server";
                }
                else if (status == "true") {
                    notifications_div.className = "alert alert-success";
                    notifications_div.innerHTML = "All Files stored in the server successfully";
                }
                document.getElementById("previews").innerHTML = "";
                notifications_div.style.display = "block";
            }
        });
    };

    var removeAllFiles = function () {
        myDropzone.removeAllFiles();
    };

    var uploadAllFiles = function () {
        myDropzone.processQueue();
    };

    return {
        init: function () {
            initialize();
            $(document).on("click", "#remove-all", removeAllFiles);
            $(document).on("click", "#upload-all", uploadAllFiles);
        }
    };

}();

$(function () {
    WARANA.module.uploadCv.init();
});


