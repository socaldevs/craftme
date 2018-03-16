const Sequelize = require('sequelize');

const sequelize = new Sequelize('skills', 'root', '', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});

module.exports = sequelize;
