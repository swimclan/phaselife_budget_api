var express = require('express');
var bodyParser = require('body-parser');
var db = require('./src/db');
require('dotenv').load();
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    console.log('DB Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database');
  });

require('./src/routes')(app);

var server = app.listen(3000, function () {
    console.log('app running on port.', server.address().port, 'NODE_ENV:', process.env.NODE_ENV);
});