const express = require('express');
const sequelize = require('../db');
const router = require('./routes/index.js');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('short'));

// app.get('/', res.send('Hello world!'));

app.use(router);

//app.use(express.static(path.join(__dirname, '/../client/dist')));

app.listen(3000, () => console.log('Example app listening on port 3000!'));

sequelize.sync().then(() => {
  console.log('DB synced');
});
