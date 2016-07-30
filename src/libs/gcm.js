const request = require('request');
const config = require('../config/config.json');
const crypto = require('crypto');
exports.sendPush = function(reg_ids, title, content) {
    return new Promise(function(resolve, reject) {
        const msg = {
            registration_ids: reg_ids,
            priority     : 'high',
            data: {
                title: title,
                body: content,
                content: content,
                id_token: crypto.randomBytes(16).toString('hex'),
                'content-available': '1'
            },
        }

        request.post({
            uri: 'https://gcm-http.googleapis.com/gcm/send',
            json: msg,
            headers: {
                Authorization: 'key=' + config.gcm.key
            }
        }, function(err, res, body) {
            if(err) {
                reject(err)
            }

            resolve(body);
        })
    })

}
