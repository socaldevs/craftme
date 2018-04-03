const Sequelize = require('sequelize');
const env = require('dotenv');
const path = require('path');
const ENV = path.resolve(__dirname, '../.env')
env.config({path: (ENV)});
console.log("database path: ",ENV)


// please make changes specific to your machine on the env file or 
// comment out how the connection settings were before you edited it
// like so:
// const sequelize = new Sequelize('postgres', process.env.DB_USER, '', {
// BEFORE: const sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
// for Brian: 'postgres', process.env.DB_USER, ''
const sequelize = new Sequelize( 'postgres', process.env.DB_USER, '', {
  host: process.env.DB_HOST,
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