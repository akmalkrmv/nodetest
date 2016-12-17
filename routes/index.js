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

router.get('/category', function (req, res, next) {
    res.render('category/index', {
        title: 'Categories'
    });
});

router.get('/word', function (req, res, next) {
    res.render('word/index', {
        title: 'Words'
    });
});


router.get('/training', function (req, res, next) {
    res.render('training/index', {
        title: 'Training'
    });
});

router.get('/grammar', function (req, res, next) {
    res.render('grammar/index', {
        title: 'Grammar'
    });
});

router.get('/auth', function(req,res,next){
    res.render('auth',{
        title: 'Authenticate'
    });
});


router.get('/topic', function(req,res,next){
    res.render('topic/index',{
        title: 'Topic'
    });
});


router.get('/tests', function(req,res,next){
    res.render('tests/index',{
        title: 'Tests'
    });
});




module.exports = router;