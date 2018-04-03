const express = require('express');
const sequelize = require('../db');
const router = require('./routes/index.js');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const passport = require('passport');
const expressSession = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const env = require('dotenv');
const fileUpload = require('express-fileupload');
const CronWorker = require('../worker/cronworker.js');

// CronWorker.start();

const ENV = path.resolve(__dirname, '../.env');
env.config({path: ENV});
console.log("rest server path: ",ENV)

/* CHANGE AWS HERE */

const app = express();
app.listen(process.env.REST_PORT, () => console.log(`RESTful server listening on port ${process.env.REST_PORT}`));
  /* 
***REPLACE FOR AWS***
const privateKey = fs.readFileSync(path.resolve(__dirname, '../../../../etc/nginx/ssl/private/craftme.key'), 'utf8');
const certificate = fs.readFileSync(path.resolve(__dirname, '../../../../etc/nginx/ssl/certs/ssl-bundle.crt'), 'utf8');
const credentials = { key: privateKey, cert: certificate };
const server = require('https').createServer(credentials, app);

server.listen(process.env.REST_PORT, () => console.log(`RESTful server listening on port ${process.env.REST_PORT}`));
*/

app.use(fileUpload());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('short'));
app.use(
  cors({
    allowedHeaders: 'Content-Type, authorization',
    methods: ['GET, POST, PUT, DELETE', 'OPTIONS'],
  }),
);



app.use(expressSession({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());


app.use(router);

// setting the connection with the db
sequelize.sync()
  .then(() => {
    console.log('DB synced');
  });
