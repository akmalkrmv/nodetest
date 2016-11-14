var express = require('express');
var router = express.Router();
var User = require("../models/User").User;

// Render views
router.get('/', function (req, res, next) {
  res.render('user/list', {
    title: 'List of users'
  });
 
  // If we use only jade:
  // User.find(function (err, users) {
  //   res.render('user/list', {
  //     list: users
  //   });
  // });
});

router.get('/create', function (req, res) {
  res.render('user/create', {
    title: 'Create user'
  });
});

router.get('/edit/:id', function (req, res) {
  res.render('user/edit', {
    title: 'Edit ' + user.username
  });

  // If we use only jade:
  // User.findById(req.params.id, function (err, user) {
  //   if (err) res.send(err);
  //   res.render('user/edit', {
  //     user: user
  //   });
  // });
});

module.exports = router;