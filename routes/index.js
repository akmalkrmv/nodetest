var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

// Render views
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});
router.get('/users', function (req, res) {
    var collection = req.db.get("usercollection");
    collection.find({}, {}, function (e, docs) {
        res.render('userlist', {
            "userlist": docs
        });
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

    collection.find({_id: ObjectId(id)}, {}, function (e, docs) {

        res.render('useredit', {
            "user": docs[0]
        });
    });
});


// api
router.put('/api/user/:id/', function (req, res) {
    var db = req.db;
    var collection = db.get('usercollection');

    var id = req.params.id;
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    collection.update({
            _id: id
        }, {
            "username": userName,
            "email": userEmail
        }, {
            upsert: true
        },
        function (err, doc) {
            if (err) {
                res.send("There was a problem editing the information to the database.");
            } else {
                res.json(doc);
            }
        }
    );
});
router.post('/api/user/', function (req, res) {
    var db = req.db;
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    var collection = db.get('usercollection');

    collection.insert({
        "username": userName,
        "email": userEmail
    }, function (err, doc) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        } else {
            res.send('Success');
        }
    });
});
router.get('/api/user/', function (req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});
router.get('/api/user/:id/', function (req, res) {
    var id = req.params.id;
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({
        _id: ObjectId(id)
    }, {}, function (e, docs) {
        res.json(docs);
    });
});
router.delete('/api/user/:id/', function (req, res) {
    var id = req.params.id;
    var db = req.db;
    var collection = db.get('usercollection');

    collection.remove({
        "_id": id
    }, function (err, doc) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        } else {
            res.json("success");
        }
    });
});


module.exports = router;