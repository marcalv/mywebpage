

const DEFAULT_MAX_TIME = 5
const DEFAULT_MIN_TIME = 2
const DEFAULT_LEVEL = '0'
const DEFAULT_SOUND_ENABLE = 1
const DEFAULT_SOUND_PACK = '0'


function sound(cmd){
    switch(cmd) {
        case 'enable':
            sound_enable = true
            break
        case 'disable':
            sound_enable = false
            break
        case '0':
            startaudio =  Audio('audio/bell/start.mp3');
            alarmaudio =  Audio('audio/bomb/alarm.mp3');
            break
        case '1':
            startaudio =  Audio('audio/bell/start.mp3');
            alarmaudio =  Audio('audio/bell/alarm.mp3');
            break
        case '2':
            startaudio =  Audio('audio/apm/start.mp3');
            alarmaudio =  Audio('audio/apm/alarm.mp3');
            break
        case '3':
            startaudio =  Audio('audio/bell/start.mp3');
            alarmaudio =  Audio('audio/realbomb/alarm.mp3');
            break

        default:
            if (sound_enable == 1) {
                switch(cmd) {
                    case 'play_start':
                        startaudio.play();
                        break
                    case 'stop_start':
                        startaudio.pause();
                        startaudio.currentTime = 0;
                        break
                    case 'play_alarm':
                        alarmaudio.play();
                        break
                    case 'stop_alarm':
                        alarmaudio.pause();
                        alarmaudio.currentTime = 0;
                        break
                }

            }
    }
}




function reset_settings(){
    maxtime = DEFAULT_MAX_TIME
    mintime = DEFAULT_MIN_TIME
    level = DEFAULT_LEVEL
    sound_enable = DEFAULT_SOUND_ENABLE
    sound_pack = DEFAULT_SOUND_PACK
    sound(sound_pack)
    render_settings()
    generate_letterlist()
}


function save_settings(){
    maxtime = $('#maxtime').val()
    mintime = $('#mintime').val()
    level = $('#level').val()
    sound_enable = $('#soundenable').val()
    sound_pack = $('#soundpack').val()
    sound(sound_pack)
    generate_letterlist() 

}

function render_settings(){
    $('#maxtime').val(maxtime)
    $('#mintime').val(mintime)
    $('#level').val(level)
    $('#soundenable').val(sound_enable)
    $('#soundpack').val(sound_pack)

}



jQuery.fn.visible = function() {
    return this.css('visibility', 'visible');
};

jQuery.fn.invisible = function() {
    return this.css('visibility', 'hidden');
};


function set_state(newstate){
    switch(newstate) {
        case 'initial':
            $('#cancelbtn').invisible()
            newstate = 'start'
        case 'start':
            set_position()
            hide_letter()
            $('#hint').text('Toca para iniciar una nueva ronda.')
            set_background('normal')
            $('#cancelbtn').invisible()
            sound('stop_start')
            sound('stop_alarm')
            clearTimeout(timer);
            break;
        case 'thinking':
            sound('play_start')
            $('#letter').visible()
            set_letter()
            $('#nextbtn').invisible()
            timer = setTimeout(next_state, get_time(), 'timer')
            $('#hint').text('¡A pensar!')
            $('#cancelbtn').visible()
            break;
        case 'timedout':
            sound('stop_start')
            $('#hint').text('¡BOOM! Tiempo agotado, toca para continuar.')
            $('#cancelbtn').invisible()
            set_background('alarm')
            sound('play_alarm')
            clearTimeout(timer);
            break;
        default:
            // code block
    } 
    state = newstate
}


function next_state(switch_key){
    switch(state) {
        case 'initial':
            set_state('start')
            break
        case 'start':
            set_state('thinking')
            break;
        case 'thinking':
            if (switch_key == 'timer'){
                set_state('timedout')
            }
            break;
        case 'timedout':
            set_state('start')
            break;
        default:
        // code block
    }
}


function set_background(mode){
    switch(mode) {
        case 'alarm':
            $('#body').addClass('blink-bg')
            break
        case 'normal':
            $('#body').removeClass('blink-bg')
            break
        default:
        // code block
    }
}




function set_position(){
    let positions = ['tic', 'tac', 'boom']
    const position = positions[Math.floor(Math.random() * positions.length)];
    $('#position').text(position)
}

function set_letter(){
    letter = letterlist[Math.floor(Math.random() * letterlist.length)];
    $('#letter').text(letter)
}

function hide_letter(){
    $('#letter').text('-')
}

function get_time(){
    inttime =  (Math.floor(Math.random() * (maxtime - mintime + 1) + mintime))*1000;
    return 2500
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function generate_letterlist(){
    jQuery.ajaxSetup({async:false});
    $.get('letters/spanish.txt', function(data) {
        letterlist = data.split("\n");

        shuffle(letterlist)

        switch(level) {
            case '0':
                $.each(letterlist, function( index, value ) {
                    letterlist[index] = value.substring(0,2)
                });
                break
            case '1':
                $.each(letterlist, function( index, value ) {
                    letterlist[index] = value.substring(0,3)
                });
                break
            case '2':
                $.each(letterlist, function( index, value ) {
                    letterlist[index] = value.substring(0,4)
                });
                break
            default:
            // code block
    }

        

    }, 'text');

}




var mintime
var maxtime
var level
var sound_enable
var sound_pack
var startaudio
var alarmaudio
var timer
var state
var letterlist


reset_settings()

set_state('initial')


