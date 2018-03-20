const db = require('../../db/schema.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  //TODO: ask team about fetchAllMessages
  fetchAllMessages: async (req, res) => {
    try {
      let { id } = req.params;
      let messages = await db.Message.findAll({
        where: {
          [Op.or]: [{ recipient_id: id }, { sender_id: id }]
        }
      });
      res.send(messages);
    } catch (error) {
      console.log('Error with fetchAllMessages', error);
      return;
    }
  },
  sendMessage: async (req, res) => {
    try {
      let { recipient_id, sender_id, text } = req.body;
      let message = await db.Message.create({
        recipient_id: recipient_id,
        sender_id: sender_id,
        text: text,
        parent_id: null
      });
      res.send(message);
    } catch (error) {
      console.log('Error with sendMessage', error);
      return;
    }
  },
  replyMessage: async (req, res) => {
    try {
      let { recipient_id, sender_id, text, parent_id } = req.body;
      let message = await db.Message.create({
        recipient_id: recipient_id,
        sender_id: sender_id,
        text: text,
        parent_id: parent_id
      });
      res.send(message);
    } catch (error) {
      console.log('Error with replyMessage', error);
      return;
    }
  }
};
