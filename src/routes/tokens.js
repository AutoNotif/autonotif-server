const app = require('../app');
const secret = require('../models/secret');

app.get('/api/v1/tokens', function(req,res) {
    var sess = req.session;

    if(!sess.user_id) {
        res.json({error: 'Authentication Needed'})
    }

    console.log(sess.user_id)

    secret.getSecretByUserId(sess.user_id)
        .then(function(data) {
            res.json(data);
        })
        .catch(function(data) {
            res.json({error:'Cant get tokens'})
        })
})

app.get('/api/v1/tokens/new', function(req,res) {
    var sess = req.session;

    if(!sess.user_id) {
        res.json({error: 'Authentication Needed'})
    }

    console.log(sess.user_id)

    secret.insertSecret(sess.user_id, 'test')
        .then(function(data) {
            res.json(data);
        })
        .catch(function(data) {
            res.json({error:'Cant get tokens'})
        })
})
