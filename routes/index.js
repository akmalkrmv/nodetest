var router = require('express').Router();

// Render views
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Home'
    });
});

router.get('/language', function (req, res, next) {
    res.render('language/index', {
        title: 'Languages'
    });
});

router.get('/vocabulary', function (req, res, next) {
    res.render('vocabulary/index', {
        title: 'Vocabulary'
    });
});

router.get('/word', function (req, res, next) {
    res.render('word/index', {
        title: 'Words'
    });
});


router.get('/training', function (req, res, next) {
    res.render('training', {
        title: 'Training'
    });
});

router.get('/grammar', function (req, res, next) {
    res.render('grammar', {
        title: 'Grammar'
    });
});



module.exports = router;