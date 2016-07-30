const app = require('./app');
const config = require('./config/config.json')
const https = require('https');
const fs = require('fs');
const session = require('express-session')
const crypto = require('crypto');
const bodyParser = require("body-parser");

const secret = crypto.randomBytes(16).toString('hex');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});


var sess = session({
    secret: secret,
    saveUninitialized: true,
    resave: false,
    cookie: { secure: config.https.enable }
});

app.use(sess);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
require('./routes/push');
require('./routes/device');
require('./routes/index');
require('./routes/tokens');

if(config.https.enable) {
    const privateKey  = fs.readFileSync(config.https.private_key, 'utf8');
    const certificate = fs.readFileSync(config.https.certificate, 'utf8');
    const credentials = { key: privateKey, cert: certificate, passphrase:config.https.passphrase};

    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(config.port, function() {
        console.log('App listening on port: ' + config.port);
    });
} else {
    app.listen(config.port, function () {
      console.log('App listening on port: ' + config.port);
    });
}
