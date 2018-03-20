const express = require('express');
const socket = require('socket.io');
const parser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const middleware = [
  helmet(),  
  parser.json(),
  parser.urlencoded({ extended: true }),
  cors({
    allowedHeaders: 'Content-Type, authorization',
    methods: ['GET, POST, PUT, DELETE', 'OPTIONS'],
  }),
];

const { router } = require('./routes');
const db = require('./db');

const app = express();
const server = app.listen(3001, console.log('listening to PORT 3001'));
const io = socket(server); 
// web socket connection UPGRADES the http connection
// io is the upgraded http server

io.on('connection', (socket) => {
  // 'socket' var represents specific client connection
  console.log('made socket connection!', socket.id);
  
  socket.on('room', (room) => {
    socket.join(room);
    io.sockets.in(room).emit('message', 'SUUUUP');
  });

  socket.on('chat', (data) => {
    io.sockets.in(data.room).emit('chat', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.to(data.room).emit('typing', data.feedback);
  });
});

app.use(...middleware);
app.use(router);








