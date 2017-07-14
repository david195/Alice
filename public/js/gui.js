var Gui = (function(){
  var layout,controls,events;

  var init = function(div,evt){
    events = evt;
    layout = e('div','layout');
    controls = e('div','controls',
    [
      e_select('connection',[{text:"Local",value:"local"},
      {text:"server",value:"server"},
      {text:"client",value:"client"}],{onchange:events.connection}),
      e('button','bconnection',[text("Aceptar")])
    ]);
    layout.appendChild(controls);
    document.getElementById(div).appendChild(layout);

  }

  return{
    init:init,
    layout:layout
  }

})();

/*Secundary functions*/
function e(element,id,childs){
  var r = document.createElement(element);
  r.id = id;
  if(childs!=null)
    for(var i=0; i<childs.length;i++)
      r.appendChild(childs[i])

  return r;
}
function e_select(id,options,events){
  var select = e('select',id);
  for (var i = 0; i < options.length; i++){
    var option = e('option','opt'+i);
    option.innerHTML = options[i].text;
    option.value = options[i].value;
    select.add(option);
  }
  select = set_events(events,select);
  return select;
}
function $(id){return document.getElementById(id)}
function text(txt){
  return document.createTextNode(txt);
}
function set_events(events,element){
  for (i in events){
    element[i] = events[i]
  }
  return element;
}
