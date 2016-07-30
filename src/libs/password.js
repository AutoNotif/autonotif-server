var bcrypt = require('bcrypt');

exports.cryptPassword = function(password, callback) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err)
            {
                reject(err);
            }

            bcrypt.hash(password, salt, (err, hash) => {
                resolve(hash);
            });

        });
    });

};

exports.comparePassword = function(password, userPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(password, userPassword, (err, isPasswordMatch) => {
            if (err) {
                reject(err);
            }

            resolve(isPasswordMatch);
        });
    });

};
