$('.upload-btn').on('click', function (){
    $('#upload-input').click();
});

$('#upload-input').on('change', function(){

  var files = $(this).get(0).files;

  if (files.length > 0){
    // One or more files selected, process the file upload

    // create a FormData object which will be sent as the data payload in Ajax
    var formData = new FormData();

    for(var i = 0; i < files.length; i++)
    {
        var file = files[i];
        formData.append('uploads[]', file, file.name);
    }

    $.ajax({
        url: '/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
            console.log('upload successful!\n' + data);
        }

    });


  }

});