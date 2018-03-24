const Sequelize = require('sequelize');

// setting up the connection configurations
const sequelize = new Sequelize('postgres', 'root', '', {
  host: 'localhost',  // we might have to change this when deployment
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  port: 5432 || 5433,
  operatorsAliases: false
});

module.exports = sequelize;
