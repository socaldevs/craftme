const db = require('../../db/schema.js');

module.exports = {
  fetchAllMessages: (req, res) => {
    //get user id from req.params
    //query messages table where recipient =
    //res.send data
  },
  sendMessage: (req, res) => {
    //get info from req.body
    //insert into messages table where parentId = null
  },
  replyMessage: (req, res) => {
    //get info from req.body
    //insert into messages table where parentId = original message Id
  }
};
