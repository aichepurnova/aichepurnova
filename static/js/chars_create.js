$('#class-select').change(function(){changeParam()});
$('#race-select').change(function(){changeParam()});
$('#bg-select').change(function(){changeParam()});

function changeParam(){
    let url_string = window.location.protocol +
                    '//'+window.location.host +
                    '/chars/get_chars_params?' +
                    'cl=' + $('#class-select').val() +
                    '&race='+$('#race-select').val() +
                    '&bg='+$('#bg-select').val();

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url_string, false ); // false for synchronous request
    xmlHttp.send( null );
    var resp = JSON.parse(xmlHttp.responseText);

    for (var key_l1 in resp[0]) {
        value_l1 = resp[0][key_l1];
        param = '#info-'+key_l1;
        if ($(param)[0].innerHTML != value_l1){
            $(param)[0].innerHTML = value_l1;
            $(param).addClass("table-active");
        }
        else {
            $(param).removeClass("table-active");
        }
    };
};
