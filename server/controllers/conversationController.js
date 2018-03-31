const db = require('../../db/schema.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const userController = require('./userController.js');

module.exports = {
  createConversation: (sender_id, recipient_id) => {
    return `
      INSERT INTO conversations (user_id, recipient_id)
      VALUES (${sender_id}, ${recipient_id})
      RETURNING id
      `;
  },
  verifyConversationExists: (sender_id, recipient_id) => {
    return `
      SELECT id, user_id, recipient_id FROM conversations 
      WHERE (user_id = ${sender_id} AND recipient_id = ${recipient_id}) 
      OR (user_id = ${recipient_id} AND recipient_id = ${sender_id})
    `;
  },
  fetchAllConversationsById: async (req, res) => {
    try {
      const { id } = req.params;
      const conversations = await db.Conversation.findAll({
        where: {
          [Op.or]: [
            {
              user_id: id
            },
            {
              recipient_id: id
            }
          ]
        },
        raw: true
      });
      for (let i = 0; i < conversations.length; i++) {
        conversations[i].sender = await userController.fetchUsernameById(
          conversations[i].user_id
        );
        conversations[i].recipient = await userController.fetchUsernameById(
          conversations[i].recipient_id
        );
      }
      res.send(conversations);
    } catch (error) {
      console.log('Error with fetchAllConversationsById', error);
    }
  },
  fetchAllMessagesByConversationId: async (req, res) => {
    try {
      const { id } = req.params;
      const messages = await db.Message.findAll({
        where: {
          conversation_id: id
        },
        raw: true,
      });
      for (let i = 0; i < messages.length; i++) {
        messages[i].sender = await userController.fetchUsernameById(
          messages[i].sender_id
        );
        messages[i].recipient = await userController.fetchUsernameById(
          messages[i].recipient_id
        );
      }
      res.send(messages);
    } catch (error) {
      console.log('Error with fetchAllMessagesByConversation,', error);
    }
  }
};
