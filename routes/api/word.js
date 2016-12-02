var router = require('express').Router();
var https = require("https");
var path = require('path');
var fs = require('fs');
var url = require('url');
var saveAudioFile = require("../audio").saveAudioFile;

var models = require("../../models/models");
var Word = models.Word;

// Get all
router.get('/word/', function (req, res) {
    Word
        .find()
        .populate('language')
        .exec(function (err, words) {
            if (err) res.send(err);
            res.json(words);
        });
});
// Get by id
router.get('/word/:id/', function (req, res) {
    Word
        .findById(req.params.id)
        .populate('language')
        .exec(function (err, word) {
            if (err) res.send(err);
            res.json(word);
        });
});
// Create
router.post('/word/', function (req, res) {
    var word = new Word(req.body);

    word.save(function (err, word) {
        if (err) return res.json(err);

        Word.populate(word, "language", function (err, word) {
            saveAudioFile(word);

            word.language.words.push(word);
            word.language.save();
        });

        res.json(word);
    });
});
// Update
router.put('/word/:id/', function (req, res) {
    Word.findOneAndUpdate({
            _id: req.params.id
        },
        req.body,
        function (err, word) {
            if (err) res.send(err);

            saveAudioFile(word);
            res.json(word);
        });
});
//Delete
router.delete('/word/:id/', function (req, res) {
    Word.findByIdAndRemove(req.params.id, function (err) {
        if (err) res.send(err);
        res.json({
            message: 'Word was removed!'
        });
    });
});


module.exports = router;