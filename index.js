const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const config = require('./config');

// DB Setup
mongoose.connect(config.mongoURI[app.settings.env], function (err, res) {
  if(err) {
    console.log('Error connecting to database: ' + err);
  } else {
    console.log('Connected to Database: ', + app.settings.env);
  }
});
console.log('server_path: ', config.mongoURI[app.settings.env]);

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
router(app);

// Server Setup
const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on :', port);

module.exports = server;