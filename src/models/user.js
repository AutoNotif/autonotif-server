const db = require('./db')
const pw = require('../libs/password');


exports.createTable = function() {
    return db.none('CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, username VARCHAR(40) UNIQUE not null, password VARCHAR(60) not null)');
}

exports.getUserById = function(id) {
    return db.one('SELECT * FROM users where id=$1', [id]);
}

exports.getUserByUsername = function(username) {
    return db.one('SELECT * FROM users where username=$1', [username]);
}

exports.insertUser = function(username, password) {
    return new Promise(function(resolve,reject) {
        pw.cryptPassword(password)
            .then(function(hash) {
                resolve(db.none('INSERT INTO users(username, password) VALUES($1, $2)', [username, hash]));
            })
            .catch(function(err) {
                if(err.code === '23505') {
                    reject({error: 'Username already exists'})
                }
                reject(err);
            })
    })

}

exports.authenticateUser = function(username, password) {


    return new Promise(function(resolve, reject) {
        db.one('SELECT * FROM users where username=$1', [username])
            .then(function(data) {

                return pw.comparePassword(password, data.password)
                .then(function(passCorrect) {
                    resolve({auth:passCorrect, id:data.id});
                })
            })
            .catch(function(err) {
                if(err.name === 'QueryResultError') {
                    resolve(false);
                }
                reject(err);
            })
    })

}
