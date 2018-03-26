const Sequelize = require('sequelize');
const sequelize = require('./index.js');

//Got those from codesling in case we want to create and drop db progrmatically
const createDatabase = async database => {
  try {
    await sequelize.queryAsync(`CREATE DATABASE ${database}`);
    success('successfully created database ', database);
  } catch (err) {
    error('error creating database ', err);
  }
};

const dropDatabase = async database => {
  try {
    await sequelize.queryAsync(`DROP DATABASE IF EXISTS ${database}`);
    success('successfully dropped database ', database);
  } catch (err) {
    error('error dropping database ', err);
  }
};

// Schema
const User = sequelize.define('user', {
  // username: { type: Sequelize.STRING, unique: true },
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  type: Sequelize.INTEGER,
  bio: Sequelize.STRING,
  profile_pic_url: Sequelize.STRING,
  // crafts: Sequelize.ARRAY(Sequelize.STRING),
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
  chat_id: Sequelize.STRING,
  notes: Sequelize.STRING
});

const Feedback = sequelize.define('feedback', {
  rating: Sequelize.INTEGER,
  review: Sequelize.STRING
});

const Booking = sequelize.define('booking', {
  title: Sequelize.STRING,
  start: Sequelize.DATE,
  end: Sequelize.DATE
});

const Craft = sequelize.define('craft', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
});

const Availability = sequelize.define('availability', {
  start: Sequelize.DATE,
  end: Sequelize.DATE,
});

// join table
const CraftTeacher = sequelize.define('craft_teacher', {});

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
Availability.belongsTo(User, { foreignKey: 'teacher_id' });

User.belongsToMany(Craft, { through: CraftTeacher });
Craft.belongsToMany(User, { through: CraftTeacher });



module.exports = { User, Conversation, Message, Lesson, Feedback, Booking, Craft, CraftTeacher, Availability };
