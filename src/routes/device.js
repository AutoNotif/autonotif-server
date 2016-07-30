const app = require('../app');
const user = require('../models/user');
const device = require('../models/device');

app.get('/api/v1/device', function(req,res) {
    if(!req.get('Authorization')) {
        res.status(401).json({error: 'Missing Authentication'});
    }

    if(!req.query.reg_id) {
        res.json({error: 'Missing parameter: reg_id'});
    }

    const auth_header = req.get('Authorization').split('Basic ')[1];
    const user_details = Buffer.from(auth_header, 'base64').toString().split(':');
    const reg_id = req.query.reg_id;

    user.authenticateUser(user_details[0], user_details[1])
        .then(function(data) {
            console.log(data)
            if(!data.auth) {
                res.status(401).json({error: 'Invalid Authentication'});
            }
            return device.insertDevice(data.id, reg_id);
        })
        .then(function(data) {
            res.json({success:true});
        })
        .catch(function(error) {
            console.log('error')
            // if the registration id already exists then we were still successful
            if(error.code === '23505') {
                res.json({success:true});
            }
            console.log(error);
            res.json({error: 'unknown'});
        })

})
