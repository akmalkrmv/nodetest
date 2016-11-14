var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var User = require("../models/User").User;

// Render views
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});
router.get('/users', function (req, res) {
    res.render('userlist', {
        title: 'Express'
    });
});
router.get('/user/create', function (req, res) {
    res.render('newuser', {
        title: 'New User Yahoo!'
    });
});
router.get('/user/edit/:id', function (req, res) {
    var id = req.params.id;
    var db = req.db;
    var collection = db.get("usercollection");

    var user = collection.find(ObjectId(id));

    collection.find({
        _id: ObjectId(id)
    }, {}, function (e, docs) {

        res.render('/user/useredit', {
            "user": docs[0]
        });
    });
});


// api
router.put('/api/user/:id/', function (req, res) {

    User.findById(req.params.id, function (err, user) {
        if (err) {
            res.send(err);
        }
        user.email = req.body.email;
        user.username = req.body.username;
        user.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    });

});
router.post('/api/user/', function (req, res) {
    var user = new User({
        username: req.body.username,
        email: req.body.email
    });

    user.save(function (err, thor) {
        if (err) return res.json(err);
        res.json(user);
    });
});
router.get('/api/user/', function (req, res) {
    User.find({}, function (err, users) {
        var userMap = {};

        users.forEach(function (user) {
            userMap[user._id] = user;
        });

        res.json(userMap);
    });
});
router.get('/api/user/:id/', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
});
router.delete('/api/user/:id/', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            res.send(err);

        res.json({
            message: 'User was removed!'
        });
    });
});


module.exports = router;