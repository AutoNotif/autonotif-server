const app = require('../app');
const secret = require('../models/secret');
const device = require('../models/device');
const gcm = require('../libs/gcm');

app.get('/api/v1/push', function(req,res) {
    if(!req.get('Authorization')) {
        res.status(401).json({error: 'Missing Authentication'});
    }

    if(!req.query.title) {
        res.json({error: 'Missing parameter: title'});
    }

    if(!req.query.content) {
        res.json({error: 'Missing parameter: content'});
    }

    const auth_header = req.get('Authorization').split('Basic ')[1];
    const token = Buffer.from(auth_header, 'base64').toString().split(':')[1];
    const title = req.query.title;
    const content = req.query.content;

    secret.getSecretByToken(token)
        .then(function(data) {
            return device.getDeviceByUserId(data.user_id);
        })
        .then(function(data) {
            var reg_ids = []

            for (var i = 0; i < data.length; i++) {
                if(reg_ids.indexOf(data[i].registration_id) !== -1) {
                    continue;
                }

                reg_ids.push(data[i].registration_id)

            }

            return gcm.sendPush(reg_ids, title, content);

        })
        .then(function(data) {
            res.json({success: 'true'});
        })
        .catch(function(error) {
            console.log(error)
            res.status(401).json({error: 'Invalid Authentication'});
        });

})

//
// 1000189835312
