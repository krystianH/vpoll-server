let path = require('path');
let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3000;

app.engine('handlebars', exphbs({}));
app.set('view engine', 'handlebars');

// return absolute path of "p", starting from the project root
function abs(p) {
  return path.join(__dirname, '../', p);
}

app.get('/', (req, res) => {
  res.render('index', { port: PORT });
});

app.get('/poll-player.js', (req, res) => {
  res.sendFile(abs('./node_modules/vpoll-client/dist/vpoll-player.js'));
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (msg) => {
    console.log(`message received: ${msg}`);
    io.emit('message', msg);
  });
});

http.listen(PORT, () => console.log(`listening on *:${PORT}`));
