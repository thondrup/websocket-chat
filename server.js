var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.broadcast.emit('chat msg', {
    server: true,
    msg: 'a user connected'
  });
  
  socket.on('disconnect', function(){
    socket.broadcast.emit('chat msg', {
      server: true,
      msg: 'a user disconnected'
    });
  });

  socket.on('chat msg', function(data) {
    io.emit('chat msg', data); 
  })
});

http.listen(3000, function() {
  console.log('Listening on *:3000');
});
