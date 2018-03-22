const sequelize = require('./index.js');
const {
  User,
  Conversation,
  Message,
  Lesson,
  Feedback,
  Booking
} = require('./schema.js');

const buildTables = async () => {
  try {
    await sequelize.authenticate();
    await User.sync({ force: false });
    await Conversation.sync({ force: false });
    await Message.sync({ force: false });
    await Booking.sync({ force: false });
    await Lesson.sync({ force: false });
    await Feedback.sync({ force: false });
    console.log('-----All tables have been created!-----');
    //exit in the command line after creating tables 
    process.exit();
  } catch (error) {
    console.log(error);
    return;
  }
};

buildTables();
