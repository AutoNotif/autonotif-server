const pgp = require('pg-promise')();
const config = require('../config/config.json');

const connection = config.pg;

module.exports = new pgp(connection);
