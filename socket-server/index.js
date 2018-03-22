const express = require('express');
const socket = require('socket.io');
const parser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { router } = require('./routes');
const mongoDB = require('./db/mongoDB');
//const redis = require('./db/redis');

const PORT = 3001;
const app = express();
const server = app.listen(PORT, console.log(`Listening to PORT ${PORT}!`));
const io = socket(server); // io is upgraded server, web socket cnxn UPGRADES http cnxn
const ExpressPeerServer = require('peer').ExpressPeerServer;

const options = {
  debug: true
}

const middleware = [
  helmet(),  
  parser.json(),
  parser.urlencoded({ extended: true }),
  cors({
    allowedHeaders: 'Content-Type, authorization',
    methods: ['GET, POST, PUT, DELETE', 'OPTIONS'],
  }),
];

io.on('connection', (socket) => { // 'socket' var represents specific client connection
  console.log('made SOCKET connection!', socket.id);
  
  socket.on('room', (room) => {
    socket.join(room);
    io.sockets.in(room).emit('confirmation', `Someone has joined room ${room}`);
  });
  
  socket.on('renderchat', (data) => {
    io.sockets.in(data.room).emit('renderchat', data.messages);
  });

  socket.on('exit', (room) => {
    socket.leave(room);
  });

  socket.on('chat', (data) => {
    // console.log(io.sockets.adapter.rooms[1]);
    io.sockets.in(data.room).emit('chat', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.to(data.room).emit('typing', data.feedback);
  });

  // socket.on('peer', (data) => {
  //   socket.broadcast.to(data.room).emit('peer', data.id);
  //   console.log('---LOOK HERE', data.id);
  // });
  socket.on('getOtherPeerId', (data) => {
    console.log('getOtherPeerId', data);
    socket.broadcast.to(data).emit('getOtherPeerId', 'test');
  });

  socket.on('fetchedPeerId', (data) => {
    console.log('fetchedPeerId', data);
    socket.broadcast.to(data.room).emit('fetchedPeerId', data.peerId);
  });
});

server.on('connection', function(id) { console.log('made PEER connection!'); });

app.use(...middleware);
app.use('/api', ExpressPeerServer(server, options));
app.use(router);








