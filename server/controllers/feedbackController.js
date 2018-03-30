const db = require('../../db/schema.js');

module.exports = {
  submitFeedback: async (req, res) => {
    try {
      const { teacher_id, student_id, rating, review, lesson_id } = req.body;
      const feedback = await db.Feedback.create({
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
  },

  calculateAverageRatingForTeacher: async (req, res) => {
    try {
      let avg = 0;
      const { teacher_id } = req.params;
      //fetches all ratings for a teacher
      const feedbacks = await db.Feedback.findAll({
        where: {
          teacher_id: teacher_id
        }
      })
      for (let i = 0; i < feedbacks.length; i++) {
        avg += feedbacks[i].rating;
      }
      avg = (avg / feedbacks.length).toPrecision(3);
      //finds the record for the teacher in the User db
      const user = await db.User.find({
        where: {
          id: teacher_id
        }
      })
      //updates the rating column for the teacher in the User db
      const updatedUser = await user.update({
        rating: avg
      })
      res.send(updatedUser);
    } catch (error) {
      console.log('Error with calculateAverageRatingForTeacher', error);
      return;
    }
  },

  fetchFeedbackForLesson: async (req, res) => {
    try {
      const { lesson_id } = req.params;
      const feedback = await db.Feedback.findOne({
        where: {
          lesson_id
        }
      })
      res.send(feedback);
    } catch (error) {
      console.log('Error with fetchFeedbackForLesson', error);
      return;
    }
  }
};

