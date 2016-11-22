var router = require('express').Router();
var https = require("https");
var path = require('path');
var fs = require('fs');
var jwt = require('jsonwebtoken');

var models = require("../../models/models");
var User = models.User;

router.post('/auth/', function (req, res) {
    
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res
            .status(404)
            .json({
                message: 'Authentication failed. User not found.',
            });
        } else if (user) {
            if (user.password != req.body.password) {
                res
                .status(422)
                .json({
                    message: 'Authentication failed. Wrong password.'
                });
            } else {
                var token = jwt.sign(user, 'shhhhh');
                res
                .json({
                    id: user._id,
                    token: token
                });
            }
        }
    });
});


module.exports = router;