const express = require('express');
const socket = require('socket.io');
//const http = require('http');

const app = express();
const server = app.listen(3001, console.log('listening to PORT 3001'));
//const server = http.Server(app);
//server.listen(3001, console.log('listening to PORT 3001!))

const io = socket(server);

io.on('connection', (socket) => {
  console.log('made socket connection!', socket.id);
  
  // socket.on('room', (room) => {
  //   socket.join(room);
  //   io.sockets.in(room).emit('message', 'SUUUUP');
  // });
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});








