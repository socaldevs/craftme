const express = require('express');
const sequelize = require('../db');
const router = require('./routes/index.js');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const expressSession = require('express-session');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('short'));

app.use(expressSession({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.listen(3000, () => console.log('Example app listening on port 3000!'));

sequelize.sync().then(() => {
  console.log('DB synced');
});
