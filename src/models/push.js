const db = require('./db')

exports.createTable = function() {
    return db.none('CREATE TABLE IF NOT EXISTS pushes(id SERIAL PRIMARY KEY, user_id integer REFERENCES users (id), title VARCHAR(60), content TEXT not null, token VARCHAR(32) not null)');
}

exports.getPushById = function(id) {
    return db.one('SELECT * FROM pushes where id=$1', [id]);
}

exports.getPushByUserId = function(user_id) {
    return db.any('SELECT * FROM pushes where user_id=$1', [user_id]);
}

exports.getPushByToken = function(token) {
    return db.any('SELECT * FROM pushes where token=$1', [token]);
}

exports.insertPush = function(user_id, name, content, token) {
    return db.one('INSERT INTO pushes(user_id, name, content, token) VALUES($1, $2, $3, $4) returning id', [user_id, name, content, token])
}
