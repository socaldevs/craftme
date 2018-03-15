const Sequelize = require('sequelize');
const { User, Message, Lesson, Feedback, Booking } = require('./schema.js');
const sequelize = new Sequelize('skills', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

const buildTables = async () => {
  try {
    await sequelize.authenticate();
    await User.sync({ force: false });
    await Message.sync({ force: false });
    await Lesson.sync({ force: false });
    await Feedback.sync({ force: false });
    await Booking.sync({ force: false });
  } catch (error) {
    console.log(error);
    return;
  }
};

buildTables();

module.exports = sequelize;
