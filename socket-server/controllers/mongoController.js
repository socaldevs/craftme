const { ChatLog } = require('../db');

let test = new ChatLog({
  chats: [],
});

const testController = (req, res) => {
  test.save().then((response) => res.json(response));
}

module.exports = { testController };