/*
Thesis
"Attacks regarding online tests and ensuring the integrity of results based on the example of TTÜ admission test"
Eva Maria Veitmaa, 155408IAPB
Tallinn University of Technology
2018
*/

var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.continuous = true;
var speaking = false;
recognition.start();



recognition.onspeechstart = function() {
    console.log(+new Date + ' Speaking started.');
    changeSpeakingStatus();
};

recognition.onspeechend = function () {
    console.log(+new Date + ' Speaking stopped.');
    recognition.stop();
    changeSpeakingStatus();
    setTimeout(function () {
        recognition.start();
    }, 1000);

};

// https://stackoverflow.com/questions/17049839/continous-speech-recognition-with-webkit-speech-api?rq=1
recognition.onend = function () {
    recognition.start();
};

function changeSpeakingStatus() {
    speaking = !speaking;
    $('#speakingStatus').text(speaking.valueOf());
}