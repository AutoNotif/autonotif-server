const db = require('./db')
const crypto = require('crypto');

exports.createTable = function() {
    return db.none('CREATE TABLE IF NOT EXISTS secrets(id SERIAL PRIMARY KEY, user_id integer REFERENCES users (id), name VARCHAR(60), token VARCHAR(32) not null)');
}

exports.getSecretById = function(id) {
    return db.one('SELECT * FROM secrets where id=$1', [id]);
}

exports.getSecretByUserId = function(user_id) {
    return db.any('SELECT * FROM secrets where user_id=$1', [user_id]);
}

exports.getSecretByToken = function(token) {
    return db.one('SELECT * FROM secrets where token=$1', [token]);
}

exports.insertSecret = function(user_id, name) {
    return db.one('INSERT INTO secrets(user_id, name, token) VALUES($1, $2, $3) returning id', [user_id, name, crypto.randomBytes(16).toString('hex')])
}
