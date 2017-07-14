function analyze(in_data,callback){
  var out_data = in_data;
  return out_data;
}

var IPS = "192.168.1.67";
var sockets = [];
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path    = require("path");

io.on('connection', function(socket) {
  sockets.push(socket);
  console.log(socket.conn.id+" connected");
  socket.on('question',function(data){
    console.log(socket.conn.id+": question");
    var s = analyze(data)
    io.sockets.emit('answer',s);
  });
  socket.on('order',function(data){
    console.log(socket.conn.id+": exec");
    io.sockets.emit('exec',data);
  });
});

app.get("/",function(req,res){
  //res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-  With, Content-Type, Accept");
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get("/face",function(req,res){
  res.sendFile(path.join(__dirname+'/public/face/index.html'));
});

app.use(express.static('public'));
server.listen(3000, function() {
  console.log("Servidor corriendo en http://"+IPS+":3000");
});
