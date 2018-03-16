const db = require('../../db/schema.js');

module.exports = {
  submitFeedback: async (req, res) => {
    try {
      let { teacher_id, student_id, rating, review, lesson_id } = req.body;
      let feedback = await db.Feedback.create({
        teacher_id: teacher_id,
        student_id: student_id,
        lesson_id: lesson_id,
        rating: rating,
        review: review
      });
      res.send(feedback);
    } catch (error) {
      console.log('Error with submitFeedback', error);
      return;
    }
  }
};
