const { ChatLog } = require('../db/mongoDB');

exports.saveChat = async (req, res) => {
  try {
    const { messages, teacher_id, student_id, notes } = req.body;
    let fakeBody = {};
    fakeBody.teacher_id = teacher_id;
    fakeBody.student_id = student_id;
    fakeBody.notes = notes;
    const newChatLog = await new ChatLog({
      messages: [...messages]
    });
    let saved = await newChatLog.save();
    res.json({ fakeBody: fakeBody, saved: saved });
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
