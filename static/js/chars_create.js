$('#class-select').change(function(){changeParam()});
$('#race-select').change(function(){changeParam()});
$('#bg-select').change(function(){changeParam()});

$('#btn-step1').click(function(){changeStep('step1')});
$('#btn-step2').click(function(){changeStep('step2')});
$('#btn-step2-back').click(function(){changeStep('step2')});
//TODO: validate stats when next

$('#btn-step3').click(function(){
    changeStep('step3');
    updateProfs();
});
//TODO: validate profs when checked

$('#btn-roll4d6').click(function(){changeStats(4)});
$('#btn-roll3d6').click(function(){changeStats(3)});

const stats = ['str', 'dex', 'con', 'int', 'wis', 'cha']

for (i=0; i < stats.length; i++){
    let btn_dn = '#stat-'+stats[i]+'-dn'
    let btn_up = '#stat-'+stats[i]+'-up'
    $(btn_dn).click(function(){moveStat(btn_dn)})
    $(btn_up).click(function(){moveStat(btn_up)})
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

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

    for (var key in resp[0]) {
        value = resp[0][key];
        param = '#info-'+key;
        if ($(param)[0].innerHTML != value){
            $(param)[0].innerHTML = value;
            $(param).addClass("table-active");
            if (key == 'bonuses') {
                $('#info-bonuses-step2')[0].innerHTML = value;
            }
        }
        else {
            $(param).removeClass("table-active");
        }
    };
};

function changeStep(step){
    step = '#'+step
    $('#step1')[0].style.display = "none";
    $('#step2')[0].style.display = "none";
    $('#step3')[0].style.display = "none";
    $(step)[0].style.display = "flex";
};

function changeStats(method){
    for (let j = 0; j < stats.length; j++) {
        // Calculate random number
            let arr = []
            for (let i=0; i < method; i++) {
                num = Number(getRandomIntInclusive(1,6));
                arr.push(num);
            }
            if (method == 4) {
                let min = Math.min(...arr);
                arr = arr.filter(e => e != min);
            }
            let new_value = arr.reduce((a, b) => a + b, 0)

        // Replace value
        let stat = '#stat-'+stats[j] +'-val'
        $(stat)[0].setAttribute('value', new_value)
    }


};

function moveStat(id) {
    let stat = id.split('-')[1]
    let position = id.split('-')[2]
    fst_stat = '#stat-'+stat+'-val'

    if (position == 'up') {
        if (stat == 'str') {var new_id = 5}
        else {
            var new_id = stats.findIndex((element) => element == stat)
            new_id = new_id - 1
        }
    }
    else {
        if (stat == 'cha') {var new_id = 0}
        else {
            var new_id = stats.findIndex((element) => element == stat)
            new_id = new_id + 1
        }
    }

    snd_stat = '#stat-'+stats[new_id]+'-val'
    fst_stat_value = $(fst_stat)[0].value
    snd_stat_value = $(snd_stat)[0].value
    $(fst_stat)[0].setAttribute('value', snd_stat_value)
    $(snd_stat)[0].setAttribute('value', fst_stat_value)
};

function updateProfs() {
    var profs_bg = $('#info-proficiencies-bg')[0].innerHTML
    var profs_class = $('#info-proficiencies-class')[0].innerHTML

    $('#prof-class-step3')[0].innerHTML = profs_class
    $('#prof-bg-step3')[0].innerHTML = profs_bg

    profs_bg = profs_bg.toLowerCase();
    profs_class = profs_class.toLowerCase();
    defaults = profs_bg.split('choose')[0];

    for (i=0; i<18; i++) {
        let prof_tag = "#prof-"+i
        let prof_value = $(prof_tag).parent().find("label")[0].innerHTML
        prof_value = prof_value.replace(prof_value.substr(-6), '')
        prof_value = prof_value.toLowerCase()

        $(prof_tag).prop("checked", false);

        if ((profs_class.includes('any')) || (profs_bg.includes('any')) ||
        (profs_class.includes(prof_value)) || (profs_bg.includes(prof_value)))  {
            $(prof_tag).prop("disabled", false);
            $(prof_tag).parent().find("label").css("color", "#000000");
        }
        else {
            $(prof_tag).prop("disabled", true);
            $(prof_tag).parent().find("label").css("color", "#dadada");
        }

        if (defaults.includes(prof_value)) {
            $(prof_tag).prop("checked", true);
        }
    }
};

