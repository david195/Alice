function add_script(src){
  var tag = document.createElement('script');
  tag.src = src;
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

add_script("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");

/*Module Youtube*/
var Youtube = (function(){
  var container;
  var player;
  add_script("https://www.youtube.com/iframe_api");

  var init = function(div){
    container = document.createElement('div');
    document.getElementById(div).appendChild(container);
    player = new YT.Player(container, {
      height: '390',
      width: '640',
      videoId: 'wRD7Isyn5dU',
      /*events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }*/
    });
  }

  var search = function(query){player.loadPlaylist({list:query,listType:"search"})}
  var pause = function(){player.pauseVideo()}
  var stop = function(){player.stopVideo()}
  var play = function(){player.playVideo()}
  var next = function(){player.nextVideo()}
  var previous = function(){player.previousVideo()}
  var destroy = function(){player.destroy(); container.parentNode.removeChild(container)}

  var exec = function(cmd){
    if(this[cmd]!=null){
      this[cmd]();
      return 0;
    }
    this['search'](cmd);
  }

  return {
    init:init,
    search:search,
    pause:pause,
    stop:stop,
    play:play,
    next:next,
    previous:previous,
    destroy:destroy,
    exec:exec
  }

})();

/*Module Google*/
var Google = (function(){
  var container;
  var frame = document.createElement('iframe')

  var init = function(div){
    container = document.getElementById(div);
    container.appendChild(frame);
  }

  var search = function(query){
    url = 'https://www.google.com.mx/search?q='+query;
    frame.src = url;
    window.open(url);
  }

  return{
    init:init,
    search:search
  }

})();

/*Module wikipedia*/
var Wikipedia = (function(){
  var container;
  var frame = document.createElement('iframe');
  var init = function(div){
    container = document.getElementById(div);
    container.appendChild(frame)
  }

  var search = function(title){
    title = title.replace(" ","%20")
    frame.src = "https://es.wikipedia.org/wiki/"+title;
    $.ajax({
        type: "GET",
        url: "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles="+title+"&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            var x = data['query']['pages'];
            for (var a  in x) {
              Talking.speak(x[a]['extract'],'Spanish Female');
            }
        },
        error: function (errorMessage) {
        }
    });
  }

  return{
    init:init,
    search:search
  }
})();
