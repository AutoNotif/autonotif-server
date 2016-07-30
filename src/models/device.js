const db = require('./db')

exports.createTable = function() {
    return db.none('CREATE TABLE IF NOT EXISTS devices(id SERIAL PRIMARY KEY, user_id integer REFERENCES users (id), registration_id VARCHAR(256) UNIQUE)');
}

exports.getDeviceById = function(id) {
    return db.one('SELECT * FROM devices where id=$1', [id]);
}

exports.getDeviceByUserId = function(user_id) {
    return db.any('SELECT * FROM devices where user_id=$1', [user_id]);
}

exports.getDeviceByRegId = function(reg_id) {
    return db.any('SELECT * FROM devices where registration_id=$1', [reg_id]);
}

exports.insertDevice = function(user_id, reg_id) {
    return db.one('INSERT INTO devices(user_id, registration_id) VALUES($1, $2) returning id', [user_id, reg_id])
}
