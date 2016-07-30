const request = require('request');
const config = require('../config/config.json');

exports.sendPush = function(reg_ids, title, content) {
    return new Promise(function(resolve, reject) {
        const msg = {
            registration_ids: reg_ids,
            data: {
                title: title,
                content: content
            }
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
