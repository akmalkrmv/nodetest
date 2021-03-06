var router = require('express').Router();
var https = require("https");
var path = require('path');
var fs = require('fs');

var models = require("../../models/models");
var User = models.User;
var Word = models.Word;
var Language = models.Language;
var Vocabulary = models.Vocabulary;


// User
router.get('/user/', function (req, res) {
    User
        .find()
        .populate('dictionary')
        .exec(function (err, users) {
            if (err) res.send(err);
            res.json(users);
        });
});

router.get('/user/:id/', function (req, res) {
    User
        .findById(req.params.id)
        .populate('dictionary')
        .exec(function (err, user) {
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
        res.json({
            message: 'User was removed!'
        });
    });
});


module.exports = router;