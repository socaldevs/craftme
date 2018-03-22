const db = require('../../db/schema.js');
const sequelize = require('../../db/index.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const userController = require('./userController.js');
const conversationController = require('./conversationController.js');

module.exports = {
  fetchAllMessages: async (req, res) => {
    try {
      let messages = [];
      let { id } = req.params;
      let conversations = await conversationController.fetchAllConversationsById(
        id
      );
      let allConversations = await conversationController.fetchAllMessagesByConversations(
        conversations
      );
      for (let i = 0; i < allConversations.length; i++) {
        for (let j = 0; j < allConversations[i].length; j++) {
          let sender = await userController.fetchUsernameById(
            allConversations[i][j].sender_id
          );
          let recipient = await userController.fetchUsernameById(
            allConversations[i][j].recipient_id
          );
          allConversations[i][j].sender_id = sender;
          allConversations[i][j].recipient_id = recipient;
          await messages.push(allConversations[i]);
        }
      }
      res.send(allConversations);
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
          conversation_id: exists[0][0].id
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
  }
  // replyMessage: async (req, res) => {
  //   try {
  //     let { recipient_id, sender_id, text, conversation_id } = req.body;
  //     let message = await db.Message.create({
  //       recipient_id,
  //       sender_id,
  //       text,
  //       conversation_id
  //     });
  //     res.send(message);
  //   } catch (error) {
  //     console.log('Error with replyMessage', error);
  //     return;
  //   }
  // }
};
