const db = require('../../db/schema.js');
const Sequelize = require('sequelize');

module.exports = {
  createConversation: async (sender_id, recipient_id) => {
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
  }
};
