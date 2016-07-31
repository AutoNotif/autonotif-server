const user = require('./models/user');
const push = require('./models/push');
const secret = require('./models/secret');
const device = require('./models/device');

user.createTable()
    .then(function() {
        console.log('User table created');
        return secret.createTable();
    })
    .then(function() {
        console.log('Secret table created');
        return push.createTable();
    })
    .then(function() {
        console.log('Push table created');
        return device.createTable();
    })
    .then(function() {
        console.log('Device table created');
        process.exit(0);
    })
    .catch(function(err) {
        console.error(err);
    })
