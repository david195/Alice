function youtube(id){
  Youtube.exec(id)
}

function google(id){
  Google.search(id);
}

function wikipedia(title){
  Wikipedia.search(title);
}

function exec(cmd){
  var service = cmd.split(" ")[0];
  cmd = cmd.slice(service.length+1,cmd.length);
  var code = service+"('"+cmd+"')";
  eval(code);
}
