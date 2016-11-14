var express = require('express');
var router = express.Router();

// Render views
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Home'
    });
});

router.get('/language', function (req, res, next) {
    res.render('index', {
        title: 'Languages'
    });
});

router.get('/vocabulary', function (req, res, next) {
    res.render('index', {
        title: 'Vocabulary'
    });
});

router.get('/word', function (req, res, next) {
    res.render('index', {
        title: 'Words'
    });
});


module.exports = router;