const { ChatLog } = require('../db/mongoDB');

exports.saveChat = (req, res) => {
  const { messages } = req.body;
  const newChatLog = new ChatLog({
    messages: [...messages]
  });
  newChatLog.save().then(response => res.send(response));
}

exports.fetchChat = (req, res) => {
  const { id } = req.params; 
  ChatLog.findOne({ _id: id }).then(response => res.send(response));
}
