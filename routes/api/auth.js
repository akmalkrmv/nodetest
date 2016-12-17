var router = require('express').Router();
var jwt = require('jsonwebtoken');
var models = require("../../models/models");
var User = models.User;

var secret = 'shhhhh';

router.post('/auth/', function (req, res) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) res.send(err);

        if (!user) {
            res.status(404).json({
                message: 'Authentication failed. User not found.',
            });
        } else if (user.password != req.body.password) {
            res.status(422).json({
                message: 'Authentication failed. Wrong password.'
            });
        } else {
            var token = jwt.sign(user, secret);
            res.json({
                id: user._id,
                token: token
            });
        }
    });
});

// router.use(function (req, res, next) {

//     // check header or url parameters or post parameters for token
//     var token = req.body.token || req.param('token') || req.headers['x-access-token'];

//     // decode token
//     if (token) {

//         // verifies secret and checks exp
//         jwt.verify(token, secret, function (err, userDecoded) {
//             if (err) {
//                 return res.json({
//                     success: false,
//                     message: 'Failed to authenticate token.'
//                 });
//             } else {
//                 // if everything is good, save to request for use in other routes
//                 req.currentUser = userDecoded._doc;
//                 next();
//             }
//         });

//     } else {

//         // if there is no token
//         // return an error
//         return res.status(403).send({
//             success: false,
//             message: 'No token provided.'
//         });

//     }

// });

module.exports = router;