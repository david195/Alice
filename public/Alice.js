/*Module Talking*/
var Talking = (function(){
  /*import lybraries*/
  const sc = document.createElement('script');
  sc.src = 'https://code.responsivevoice.org/responsivevoice.js';
  document.getElementsByTagName('head')[0].appendChild(sc);

  var name = "Alice";
  //var language = 'Spanish Female';
  var language = 'US English Female';
  var sentence = "";

  var say_name = function(){
    responsiveVoice.speak(name,language);
  }

  var set_language = function(new_language){
    language = new_language;
  }

  var speak = function (new_sentence){
    sentence = new_sentence;
    responsiveVoice.speak(sentence,language);
  }

  var repit = function(){
    responsiveVoice.speak(sentence,language);
  }

  var shut_up = function(){
    responsiveVoice.cancel();
  }

  var pause = function(){
    responsiveVoice.pause();
  }

  var resume = function(){
    responsiveVoice.resume();
  }

  return{
    say_name:say_name,
    set_language:set_language,
    shut_up:shut_up,
    pause:pause,
    resume:resume,
    repit:repit,
    speak:speak
  }
})();

/*Module Listening*/
var Listening = (function(){

  var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
  //recognition.lang = "es-VE";
  recognition.lang = "en-GB";
  recognition.interimResults = false;
  recognition.maxAlternatives = 5;

  var language = '';

  var start = function(callback){
    recognition.start();
    recognition.onresult = function(event) {
        //console.log('You said: ', event.results[0][0].transcript);
        var res = event.results[0][0].transcript;
        callback(res);
    };
  }

  var stop = function(){
    recognition.stop();
  }

  var reset = function(){

  }

  return{
      start:start,
      stop:stop,
      reset:reset
  }

})();

/*Alice object*/
var Alice = (function(){
  var container = null;
  var IPS = "192.168.1.81";
  var socket = io.connect('http://'+IPS+':3000', { 'forceNew': true });
  socket.on('answer',function(aswer){
    console.log(aswer);
  });

  var init = function(div){
    container = document.getElementById(div);
    Youtube.init(div);
    Google.init(div);
    Wikipedia.init(div);
  }

  var query = function(q){
    q = q.toLowerCase();
    if(q.search("question") == 0){
      socket.emit('question',q.slice(9,q.length));
    }
    else
      exec(q); /**services.js*/
  }

  return{
    init:init,
    query:query
  }
})();
