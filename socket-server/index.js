const express = require('express');
const socket = require('socket.io');
const parser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const env = require('dotenv');

const { router } = require('./routes');
const mongoDB = require('./db/mongoDB');
const ENV = path.resolve(__dirname, '../.env');
env.config({ path: ENV });

const PORT = process.env.SOCKET_PORT;

/* CHANGE AWS HERE */

const app = express();
const server = app.listen(PORT, console.log(`SOCKET server Listening to PORT ${PORT}!`));
<<<<<<< HEAD
const io = socket(server); // io is server upgraded w/ web socket connection

/* 
const app = express();
const privateKey = fs.readFileSync(path.resolve(__dirname, '../../../../etc/nginx/ssl/private/craftme.key'), 'utf8');
const certificate = fs.readFileSync(path.resolve(__dirname, '../../../../etc/nginx/ssl/certs/ssl-bundle.crt'), 'utf8');
const credentials = { key: privateKey, cert: certificate };
const server = require('https').createServer(credentials, app);

const passed = server.listen(PORT, console.log(`SOCKET server Listening to PORT ${PORT}!`));
const io = socket(passed); // io is server upgraded w/ web socket connection
 */

 //const ExpressPeerServer = require('peer').ExpressPeerServer;

=======
const io = socket(server);
>>>>>>> [submitCrafts] controller

const options = {
  debug: true,
};

const middleware = [
  helmet(), 
  parser.json(),
  parser.urlencoded({ extended: true }),
  cors({
    allowedHeaders: 'Content-Type, authorization',
    methods: ['GET, POST, PUT, DELETE', 'OPTIONS'],
  }),
];

io.on('connection', (socket) => { 
  console.log('made SOCKET connection!', socket.id);
  socket.on('room', (data) => {
    socket.join(data.room);
    socket.broadcast.to(data.room).emit('confirmation', data);
  });
  socket.on('renderChat', (data) => {
    socket.broadcast.to(data.room).emit('renderChat', data);
  });
  socket.on('exit', (room) => {
    socket.leave(room);
    io.sockets.in(room).emit('endCall', 'endCall');
  });
  socket.on('chat', (data) => {
    io.sockets.in(data.room).emit('chat', data);
  });
  socket.on('typing', (data) => {
    socket.broadcast.to(data.room).emit('typing', data.feedback);
  });
  socket.on('offer', (data) => {
    socket.broadcast.to(data.room).emit('offer', data.offer);
  });
  socket.on('answer', (data) => {
    io.sockets.in(data.room).emit('answer', data.answer);
  });
});

app.use(...middleware);
app.use(router);
