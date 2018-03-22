const Sequelize = require('sequelize');
const sequelize = require('./index.js');

// Schema
const User = sequelize.define('user', {
  username: { type: Sequelize.STRING, unique: true },
  password: Sequelize.STRING,
  type: Sequelize.INTEGER,
  bio: Sequelize.STRING,
  profile_pic_url: Sequelize.STRING,
  crafts: Sequelize.ARRAY(Sequelize.STRING),
  rating: Sequelize.INTEGER
});

const Conversation = sequelize.define('conversation', {
  createdAt: {
    type: Sequelize.STRING,
    required: false,
    allowNull: true,
    defaultValue: '1/1/1'
  },
  updatedAt: {
    type: Sequelize.STRING,
    required: false,
    allowNull: true,
    defaultValue: '1/1/1'
  }
});

const Message = sequelize.define('message', {
  text: Sequelize.STRING
});

const Lesson = sequelize.define('lesson', {
  chat_id: Sequelize.INTEGER,
  notes: Sequelize.STRING
});

const Feedback = sequelize.define('feedback', {
  rating: Sequelize.INTEGER,
  review: Sequelize.STRING
});

const Booking = sequelize.define('booking', {
  timeslot: Sequelize.ARRAY(Sequelize.STRING)
});

// Associations
Conversation.belongsTo(User, { foreignKey: 'user_id' });
Conversation.belongsTo(User, { foreignKey: 'recipient_id' });
Message.belongsTo(User, { foreignKey: 'sender_id' });
Message.belongsTo(User, { foreignKey: 'recipient_id' });
Message.belongsTo(Conversation, { foreignKey: 'conversation_id' });
Lesson.belongsTo(User, { foreignKey: 'teacher_id' });
Lesson.belongsTo(User, { foreignKey: 'student_id' });
Feedback.belongsTo(User, { foreignKey: 'teacher_id' });
Feedback.belongsTo(User, { foreignKey: 'student_id' });
Feedback.belongsTo(Lesson, { foreignKey: 'lesson_id' });
Booking.belongsTo(User, { foreignKey: 'teacher_id' });
Booking.belongsTo(User, { foreignKey: 'student_id' });

module.exports = { User, Conversation, Message, Lesson, Feedback, Booking };
