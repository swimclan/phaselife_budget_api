var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var winston = require('./src/services/logger');
var db = require('./src/db');
require('dotenv').load();
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: winston.stream }));
app.use(cors());

const sequelize = db.instance({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
});

sequelize
  .authenticate()
  .then(() => {
    winston.info('DB Connection has been established successfully.');
  })
  .catch(err => {
    winston.error(`${err.status} - ${err.message}`);
  });

var Category = require('./src/models/category');
require('./src/routes')(app);

var server = app.listen(3000, function () {
    winston.info('app running on port.', server.address().port, 'NODE_ENV:', process.env.NODE_ENV);
});