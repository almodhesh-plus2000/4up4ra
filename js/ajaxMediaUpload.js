function ajaxMediaUpload(fInput = "#logo", formId = "#form", progressBarElement = "#progress", iconId = "icon", mainImageId = "#image_link", errorElement = "#err", mediaUrl = "media.php") {
$(fInput).on("change", (function () {
    $(formId).submit();    
}));
$(formId).on("submit", (function(e) {
  e.preventDefault();
    if ($(fInput).val()) {
      $.ajax({
          url: mediaUrl,
       method: "POST",
       data:  new FormData(this),
       contentType: false,
             cache: false,
       processData:false,
       beforeSend : function() {
        $(progressBarElement).fadeIn();
        $(errorElement).fadeOut();
        $(progressBarElement).fadeIn();
       },
        xhr: function() {
        var xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener("progress", function(evt) {
          if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);
            $(progressBarElement + "-bar").css("width", percentComplete + "%");
              $(progressBarElement + "-bar").html(percentComplete + "%");
            if (percentComplete === 100) {
                $(progressBarElement).fadeOut();
            }

          }
        }, false);

        return xhr;
      }, 
       success: function(data) {
         document.getElementById(iconId).src = data;
           $(mainImageId).val(data);
            //$(formId)[0].reset(); 
          },
         error: function(e) {
        $(errorElement).html("حدث خطأ أثناء الرفع.").fadeIn();
          }          
        });
    }
}));
}
// ajaxMediaUpload(fInput = "#logo", formId = "#form", progressBarElement = "#progress", iconId = "icon", mainImageId = "#image_link", errorElement = "#err", mediaUrl = "media.php");