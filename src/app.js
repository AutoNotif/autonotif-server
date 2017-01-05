const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chalk = require('chalk');
const https = require('https');
const http = require('http');
const fs = require('fs');

const app = express();

/*
* Load all the config stuff
*/
dotenv.load({ path: '.env' });

/*
* MongoDB Setup
*/
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

app.set('port', process.env.PORT || 3000);

const options = {
  key: fs.readFileSync(process.env.KEY),
  cert: fs.readFileSync(process.env.CERT)
};
// Create an HTTP service.
http.createServer(app).listen(80);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);
