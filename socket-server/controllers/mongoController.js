const { ChatLog } = require('../db/mongoDB');

exports.saveChat = async (req, res) => {
  try {
    const messages  = req.body;
    const newChatLog = await new ChatLog({
      messages
      // messages: [...messages]
    });
    let savedChats = await newChatLog.save();
    res.send(savedChats);
  } catch (error) {
    console.log('error with saveChat', error);
    return;
  }
};

exports.fetchChat = async (req, res) => {
  try {
    const { id } = req.params;
    let response = await ChatLog.findById({ _id: id });
    res.send(response);
  } catch (error) {
    console.log('Error with fetchChat', error);
    return;
  }
};
