var express = require('express');
var router = express.Router();
var User = require("../models/models").User;

// User
router.get('/user/', function (req, res) {
    User.find(function (err, users) {
        res.json(users);
    });
});

router.get('/user/:id/', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) res.send(err);
        res.json(user);
    });
});

router.post('/user/', function (req, res) {
    var user = new User(req.body);

    user.save(function (err, thor) {
        if (err) return res.json(err);
        res.json(user);
    });
});

router.put('/user/:id/', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) res.send(err);

        user.email = req.body.email;
        user.username = req.body.username;

        user.save(function (err) {
            if (err) res.send(err);
            res.json(user);
        });
    });
});

router.delete('/user/:id/', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) res.send(err);
        res.json({ message: 'User was removed!' });
    });
});

module.exports = router;