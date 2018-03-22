const Sequelize = require('sequelize');

// setting up the connection configurations
const sequelize = new Sequelize('skills', 'root', '1234', {
  host: 'localhost',  // we might have to change this when deployment
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // port: 5433,
  operatorsAliases: false
});

module.exports = sequelize;
