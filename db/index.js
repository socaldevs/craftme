const Sequelize = require('sequelize');

// setting up the connection configurations
<<<<<<< HEAD
const sequelize = new Sequelize('postgres', 'root', '', {
  host: 'localhost',  // we might have to change this when deployment
=======
const sequelize = new Sequelize('skills', 'root', '1234', {
  host: 'localhost', // we might have to change this when deployment
>>>>>>> [Messaging and Lessons] - Builds fully functional routes to front end
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
<<<<<<< HEAD
  port: 5432 || 5433,
=======
  port: 5433,
>>>>>>> [Rebase] - commit for rebase
  operatorsAliases: false
});

module.exports = sequelize;
