const express = require('express');
const socket = require('socket.io');
const parser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const { router } = require('./routes');
const db = require('./db');

const middleware = [
  helmet(),  
  parser.json(),
  parser.urlencoded({ extended: true }),
  cors({
    allowedHeaders: 'Content-Type, authorization',
    methods: ['GET, POST, PUT, DELETE', 'OPTIONS'],
  }),
];

const app = express();
const server = app.listen(3001, console.log('listening to PORT 3001'));
const io = socket(server); // io is upgraded server, web socket cnxn UPGRADES http cnxn

io.on('connection', (socket) => { // 'socket' var represents specific client connection
  console.log('made socket connection!', socket.id);
  
  socket.on('room', (room) => {
    socket.join(room);
    console.log('joined room', room)
    io.sockets.in(room).emit('message', 'SUUUUP');
  });

  socket.on('exit', (room) => {
    console.log('I have left room');
    socket.leave(room);
  });

  socket.on('chat', (data) => {
    console.log('room for chat event',data.room)
    // console.log('whos room 1',io.sockets.adapter.rooms[1]);
    io.sockets.in(data.room).emit('chat', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.to(data.room).emit('typing', data.feedback);
  });
});

app.use(...middleware);
app.use(router);








