const Sequelize = require('sequelize');
const sequelize = require('./tableCreator.js');

module.exports = {
  User: sequelize.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    type: Sequelize.INTEGER,
    bio: Sequelize.STRING,
    profile_pic_url: Sequelize.STRING,
    languages: Sequelize.ARRAY,
    rating: Sequelize.INTEGER
  }),

  Message: sequelize.define('message', {
    text: Sequelize.STRING
  }),

  Lesson: sequelize.define('lesson', {
    chat_id: Sequelize.INTEGER,
    notes: Sequelize.STRING
  }),

  Feedback: sequelize.define('feedback', {
    rating: Sequelize.INTEGER,
    review: Sequelize.STRING
  }),

  Booking: sequelize.define('booking', {
    timeslot: Sequelize.ARRAY,
    confirmed: Sequelize.BOOLEAN
  })
};

// Define foreign keys

Message.belongsTo(User, { foreignKey: 'teacher_id' });
Message.belongsTo(User, { foreignKey: 'student_id' });
Lesson.belongsTo(User, { foreignKey: 'teacher_id' });
Lesson.belongsTo(User, { foreignKey: 'student_id' });
Lesson.belongsTo(Feedback); //defaults to Feedback_id
Feedback.belongsTo(Lesson); //defaults to Lesson_id
Booking.belongsTo(User, { foreignKey: 'teacher_id' });
Booking.belongsTo(User, { foreignKey: 'student_id' });
