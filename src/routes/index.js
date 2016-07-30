const app = require('../app');
const path = require('path');
const user = require('../models/user');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

app.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'views', 'register.html'));
});

app.get('/tokens', function (req, res) {
    var sess = req.session;
    if(!sess.user_id) {
        res.redirect('/login');
    } else {
        res.sendFile(path.join(__dirname, '..', 'views', 'tokens.html'));
    }


});

app.post('/login', function(req, res) {
    var sess = req.session;
    if(!req.body.username || !req.body.password) {
        res.redirect('/login');
    }

    user.authenticateUser(req.body.username, req.body.password)
        .then(function(data) {
            if(!data) {
                res.redirect('/login');
            }

            sess.user_id = data.id;
            res.redirect('/tokens');
        })
        .catch(function() {
            res.redirect('/login');
        })
})

app.post('/register', function(req, res) {
    var sess = req.session;
    if(!req.body.username || !req.body.password) {
        res.redirect('/register');
    }

    user.insertUser(req.body.username, req.body.password)
        .then(function(data) {
            res.redirect('/login');
        })
        .catch(function() {
            res.redirect('/register');
        })
})
