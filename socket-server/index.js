const express = require('express');
const socket = require('socket.io');
const parser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { router } = require('./routes');
const mongoDB = require('./db/mongoDB');
//const redis = require('./db/redis');
const path = require('path');
const env = require('dotenv');
const ENV = path.resolve(__dirname, '../.env');
env.config({path: ENV});
console.log("socket server path: ",ENV)


const PORT = process.env.SOCKET_PORT;
const app = express();
const server = app.listen(PORT, console.log(`SOCKET server Listening to PORT ${PORT}!`));
const io = socket(server); // io is server upgraded w/ web socket connection
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

io.on('connection', (socket) => { // 'socket' represents specific client connection
  console.log('made SOCKET connection!', socket.id);
  
  socket.on('room', (room) => {
    socket.join(room);
    io.sockets.in(room).emit('confirmation', `Someone has joined room ${room}`);
  });
  socket.on('renderChat', (data) => {
    io.sockets.in(data.room).emit('renderChat', data.messages);
  });
  socket.on('exit', (room) => {
    socket.leave(room);
    io.sockets.in(room).emit('endCall', 'endCall');
  });
  socket.on('chat', (data) => {
    // console.log(io.sockets.adapter.rooms[roomId]);
    io.sockets.in(data.room).emit('chat', data);
  });
  socket.on('typing', (data) => {
    socket.broadcast.to(data.room).emit('typing', data.feedback);
  });
  socket.on('getOtherPeerId', (data) => {
    socket.broadcast.to(data).emit('getOtherPeerId', 'test');
  });
  socket.on('fetchedPeerId', (data) => {
    socket.broadcast.to(data.room).emit('fetchedPeerId', data.peerId);
  });
});

server.on('connection', (id) => console.log('made PEER connection!'));

app.use(...middleware);
app.use('/api', ExpressPeerServer(server, options));
app.use(router);








