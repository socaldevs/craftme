const Sequelize = require('sequelize');
const env = require('dotenv');
const path = require('path');
const ENV = path.resolve(__dirname, '../.env')
env.config({path: (ENV)});
console.log("database path: ",ENV)

<<<<<<< HEAD
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
=======
// setting up the connection configurations
const sequelize = new Sequelize('postgres', 'root', '', {
  host: 'localhost', // we might have to change this when deployment
>>>>>>> [env] commit before pull env
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  port: process.env.DB_PORT,
  logging: false,
  operatorsAliases: false
});

module.exports = sequelize;