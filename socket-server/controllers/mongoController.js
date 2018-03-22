const { ChatLog } = require('../db/mongoDB');

exports.saveChat = (req, res) => {
  const { messages, teacher_id, student_id, notes } = req.body;
  let fakeBody = {};
  fakeBody.teacher_id = teacher_id;
  fakeBody.student_id = student_id;
  fakeBody.notes = notes;
  // const newChatLog = new ChatLog({
  //   messages: [...messages]
  // });
  ChatLog.create(
    {
      messages: [...messages]
    },
    (err, response) => {
      if (err) {
        console.log('error with saveChat', error);
        return;
      } else if (response) {
        res.json({ fakeBody: fakeBody, response: response });
      }
    }
  );
  // newChatLog.save().then(response => {
};

exports.fetchChat = (req, res) => {
  const { id } = req.params;
  ChatLog.findOne({ _id: id }).then(response => res.send(response));
};
