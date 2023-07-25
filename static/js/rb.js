$(document).on("click", '#rb-add', function(){
    AddExp();
});

$(document).on("click", '#rb-submit', function(){
    saveCookie();
    RenderResume();
});

$(document).ready(function() {
//    placeCookies();
});

const form_ids = ['name', 'job', 'about', 'skills', 'education', 'hobby', 'phone', 'email', 'other',
                   'from', 'to', 'desc', 'place', 'position']

function placeCookies(){
    for (i=0; i<form_ids.length; i++) {
        var id = form_ids[i]
        id_cookie = getCookie(id)
        if (id_cookie != '') {
            document.getElementById(id).textContent=id_cookie;
        }
    }
}


function AddExp(){
    const newBigDiv = document.createElement("div");
    const newSmolDiv = document.createElement("div");
    const newVerySmolDiv = document.createElement("div");

    var tag_list = ["place", "from", "to"]

    for (var i = 0; i < tag_list.length; i++) {
        var tag = tag_list[i]
        var placeholder = tag[0].toUpperCase() + tag.substr(1)
        const element = document.createElement("input");
        element.className = "form-control"
        element.setAttribute("name", tag);
        element.setAttribute("placeholder", placeholder);
        newVerySmolDiv.appendChild(element);
        newVerySmolDiv.appendChild(document.createElement("br"));
    };

    const Position = document.createElement("input")
    Position.className = "form-control"
    Position.setAttribute("name", "position")
    Position.setAttribute("placeholder", "Position");
    newSmolDiv.appendChild(Position)
    newSmolDiv.appendChild(document.createElement("br"))

    const Description = document.createElement("textarea")
    Description.className = "form-control"
    Description.setAttribute("name", "desc")
    Description.setAttribute("placeholder", "Description");
    newSmolDiv.appendChild(Description)
    newSmolDiv.appendChild(document.createElement("br"))

    newSmolDiv.className = "col-sm-8"
    newVerySmolDiv.className = "col-sm-4"
    newBigDiv.appendChild(newVerySmolDiv)
    newBigDiv.appendChild(newSmolDiv)
    newBigDiv.className="row"

    const button = document.getElementById("rb-add")
    const parentDiv = document.getElementById("exp")
    parentDiv.insertBefore(newBigDiv, button)
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function saveCookie(){
    for (i=0; i<form_ids.length; i++) {
        var id = form_ids[i]
        var value_id = document.getElementById(id).value
        eraseCookie(id)
        setCookie(id, value_id, 7)
    }
}

function RenderResume(){
    console.log('test')
    let form = $('#rb-form');
    form = form.serialize();
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: 'rb_post',
        method: 'post',
        dataType : 'json',
        data: JSON.stringify(form),
        success: function(resp){
            console.log('test')
            $('body').html(resp.output);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            console.log('error')
        }
    });
}