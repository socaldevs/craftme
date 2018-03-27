const mongoose = require('mongoose');
const path = require('path');
const env = require('dotenv');
const ENV = path.resolve(__dirname, '../../.env');
env.config({path: ENV});
console.log("MONGO DB path: ", ENV)
console.log("MONGO: ", process.env.MON_PATH)

mongoose.connect(process.env.MON_PATH);

const db = mongoose.connection;
db.on('error', () => console.log('error connecting to MongoDB'));
db.once('open', () => console.log('Connected to MongoDB!'));

const chatLogSchema = mongoose.Schema({
  messages: []
});

const ChatLog = mongoose.model('ChatLog', chatLogSchema);

module.exports = { ChatLog };
