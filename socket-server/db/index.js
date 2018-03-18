const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/socketdb');

const db = mongoose.connection;

db.on('error', () => console.log('error connecting to MongoDB'));
db.once('open', () => console.log('Connected to MongoDB!'));

const chatLogSchema = mongoose.Schema({
  chats: [],
});
const ChatLog = mongoose.model('ChatLog', chatLogSchema);

module.exports = { ChatLog };