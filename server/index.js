const express = require('express');
const sequelize = require('../db');
const router = require('./routes/index.js');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const expressSession = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const env = require('dotenv');
const fileUpload = require('express-fileupload');


const ENV = path.resolve(__dirname, '../.env');

env.config({path: ENV});

const app = express();

app.use(fileUpload());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('short'));
app.use(
  cors({
    allowedHeaders: 'Content-Type, authorization',
    methods: ['GET, POST, PUT, DELETE', 'OPTIONS']
  })
);

app.use(expressSession({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);


app.listen(process.env.REST_PORT, () => console.log(`RESTful server listening on port ${process.env.REST_PORT}`));


sequelize.sync()
  .then(() => {
    console.log('DB synced');
  });
