var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendfile('index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (data) => {
  	io.emit('message', data);
  });
  
});

var port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
