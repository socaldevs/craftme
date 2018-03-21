const db = require('../../db/schema.js');
const sequelize = require('../../db/index.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const userController = require('./userController.js');
const conversationController = require('./conversationController.js');

module.exports = {
  //TODO: ask team about fetchAllMessages
  fetchAllMessages: async (req, res) => {
    try {
      let { id } = req.params;
      let messages = await db.Message.findAll({
        where: {
          [Op.or]: [
            {
              recipient_id: id
            },
            {
              sender_id: id
            }
          ]
        }
      });
      for (let i = 0; i < messages.length; i++) {
        let username = await userController.fetchUsernameById(
          messages[i].sender_id
        );
        messages[i].sender_id = username;
      }
      res.send(messages);
    } catch (error) {
      console.log('Error with fetchAllMessages', error);
      return;
    }
  },
  sendMessage: async (req, res) => {
    try {
      let message, result;
      let { recipient_id, sender_id, text } = req.body;
      let verify = conversationController.verifyConversationExists(
        sender_id,
        recipient_id
      );
      let exists = await sequelize.query(verify);
      if (exists[0].length > 0) {
        message = await db.Message.create({
          recipient_id: recipient_id,
          sender_id: sender_id,
          text: text,
          conversation_id: exists.conversation_id
        });
      } else {
        let query = await conversationController.createConversation(
          sender_id,
          recipient_id
        );
        let id = await sequelize.query(query);
        message = await db.Message.create({
          recipient_id: recipient_id,
          sender_id: sender_id,
          text: text,
          conversation_id: id[0][0].id
        });
      }
      res.send(message);
    } catch (error) {
      console.log('Error with sendMessage', error);
      return;
    }
  },
  replyMessage: async (req, res) => {
    try {
      let { recipient_id, sender_id, text, conversation_id } = req.body;
      let message = await db.Message.create({
        recipient_id,
        sender_id,
        text,
        conversation_id
      });
      res.send(message);
    } catch (error) {
      console.log('Error with replyMessage', error);
      return;
    }
  }
};
