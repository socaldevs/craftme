const db = require('../../db/schema.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
  fetchAllConversationsById: async id => {
    try {
      let conversations = await db.Conversation.findAll({
        where: {
          [Op.or]: [
            {
              user_id: id
            },
            {
              recipient_id: id
            }
          ]
        }
      });
      return conversations;
    } catch (error) {
      console.log('Error with fetchAllConversationsById', error);
    }
  },
  fetchAllMessagesByConversations: async arr => {
    try {
      let convos = [];
      for (let i = 0; i < arr.length; i++) {
        let messages = await db.Message.findAll({
          where: {
            conversation_id: arr[i].dataValues.id
          }
        });
        await convos.push(messages);
      }
      return convos;
    } catch (error) {
      console.log('Error with fetchAllMessagesByConversation,', error);
    }
  }
};
