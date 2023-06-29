$('#rb-submit').submit(function(event){
    RenderResume();
});

function RenderResume(){
    var form =
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'rb_post',
        method: 'post',
        dataType : 'json',
        data: JSON.stringify(data),
        success: function(result){
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
        }
    });
}