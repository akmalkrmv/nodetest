var router = require('express').Router();
var https = require("https");
var path = require('path');
var fs = require('fs');

var models = require("../../models/models");
var User = models.User;
var Word = models.Word;
var Language = models.Language;
var Vocabulary = models.Vocabulary;


// Language
router.get('/language/', function (req, res) {
    Language.find(function (err, languages) {
        res.json(languages);
    });
});

router.get('/language/:id/', function (req, res) {
    Language.findById(req.params.id, function (err, language) {
        if (err) res.send(err);
        res.json(language);
    });
});

router.post('/language/', function (req, res) {
    var language = new Language(req.body);

    language.save(function (err, thor) {
        if (err) return res.json(err);
        res.json(language);
    });
});

router.put('/language/:id/', function (req, res) {
    Language.findById(req.params.id, function (err, language) {
        if (err) res.send(err);

        language.name = req.body.name;
        language.save(function (err) {
            if (err) res.send(err);
            res.json(language);
        });
    });
});

router.delete('/language/:id/', function (req, res) {
    Language.findByIdAndRemove(req.params.id, function (err) {
        if (err) res.send(err);
        res.json({
            message: 'Language was removed!'
        });
    });
});


module.exports = router;