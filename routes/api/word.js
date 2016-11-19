var router = require('express').Router();
var https = require("https");
var path = require('path');
var fs = require('fs');

var models = require("../../models/models");
var User = models.User;
var Word = models.Word;
var Language = models.Language;
var Vocabulary = models.Vocabulary;

// Word
router.get('/word/', function (req, res) {
    Word.find().populate('language').exec(function (error, words) {
        res.json(words);
    });
});

router.get('/word/:id/', function (req, res) {
    Word.findById(req.params.id, function (err, word) {
        if (err) res.send(err);
        res.json(word);
    });
});

router.get('/word/:id/audio/', function (req, res) {
    Word.findById(req.params.id, function (err, word) {
        var filePath = path.resolve(__dirname + '/../../public/sounds/' + word.text + '.mp3');
        fs.exists(filePath, function (exists) {
            if (exists)
                res.sendFile(filePath);
            else
                res.status(404).end();
        });
    });
});

router.get('/audio/:text', function (req, res) {
    var filePath = path.resolve(__dirname + '/../../public/sounds/' + req.params.text + '.mp3');
    fs.exists(filePath, function (exists) {
        if (exists)
            res.sendFile(filePath);
        else
            saveAudioFile(req.params.text, function (err, path) {
                if (err)
                    res.status(404).end();
                else
                    res.sendFile(path);
            });
    });
});

router.post('/word/', function (req, res) {
    var word = new Word(req.body);
    saveAudioFile(word.text);

    word.save(function (err, word) {
        if (err) return res.json(err);
        res.json(word);
    });
});

router.put('/word/:id/', function (req, res) {
    Word.findOneAndUpdate({
            _id: req.params.id
        },
        req.body,
        function (err, word) {
            if (err) res.send(err);

            saveAudioFile(word.text);
            res.json(word);
        });
});

router.delete('/word/:id/', function (req, res) {
    Word.findByIdAndRemove(req.params.id, function (err) {
        if (err) res.send(err);
        res.json({
            message: 'Word was removed!'
        });
    });
});

function saveAudioFile(text, callback) {
    var audioUrl = 'https://translate.google.com/translate_tts?tl=en-us&client=tw-ob&q=' + text;
    var audioPath = path.resolve('./public/sounds/' + text + '.mp3');
    var audioFile = fs.createWriteStream(audioPath);

    https.get(audioUrl, function (response) {
        response.pipe(audioFile);

        if (typeof (callback) == 'function')
            callback(null, audioPath);
    }, callback);
}

module.exports = router;