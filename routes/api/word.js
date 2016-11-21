var router = require('express').Router();
var https = require("https");
var path = require('path');
var fs = require('fs');
var url = require('url');

var models = require("../../models/models");
var Word = models.Word;

// Word
router.get('/word/', function (req, res) {
    Word.find().populate('language').exec(function (err, words) {
        if (err) res.send(err);
        res.json(words);
    });
});

router.get('/word/:id/', function (req, res) {
    Word.findById(req.params.id).populate('language').exec(function (err, word) {
        if (err) res.send(err);
        res.json(word);
    });
});

router.post('/word/', function (req, res) {
    var word = new Word(req.body);

    word.save(function (err, word) {
        if (err) return res.json(err);

        Word.populate(word, "language", function (err, word) {
            saveAudioFile(word.text, word.language.cultureName);

            word.language.words.push(word);
            word.language.save();
        });

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

            saveAudioFile(word.text, word.language.cultureName);
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

// Getting audio file
router.get('/audio/:cultureName/:text/', function (req, res) {
    var text = req.params.text.toLowerCase();
    var cultureName = req.params.cultureName;
    var filePath = path.resolve(__dirname + '/../../public/sounds/' + cultureName + '.' + text + '.mp3');

    fs.exists(filePath, function (exists) {
        if (exists)
            res.sendFile(filePath);
        else
            saveAudioFile(text, cultureName, function (err, path) {
                if (err) res.status(404).end();
                res.sendFile(path);
            });
    });
});

router.get('/audio/:id/', function (req, res) {
    Word.findById(req.params.id).populate('language').exec(function (err, word) {
        if (err) res.status(404).end();

        var text = word.text.toLowerCase();
        var cultureName = word.language.cultureName;
        var filePath = path.resolve(__dirname + '/../../public/sounds/' + cultureName + '.' + text + '.mp3');

        fs.exists(filePath, function (exists) {
            if (exists)
                res.sendFile(filePath);
            else
                saveAudioFile(text, cultureName, function (err, path) {
                    if (err) res.status(404).end();
                    res.sendFile(path);
                });
        });
    });
});


function saveAudioFile(text, cultureName, callback) {
    if (!text) return;

    cultureName = cultureName || 'en-us';
    text = text.toLowerCase();

    var audioUrl = 'https://translate.google.com/translate_tts?client=tw-ob&tl=' + cultureName + '&q=' + text;
    var audioPath = path.resolve('./public/sounds/' + cultureName + '.' + text + '.mp3');
    var audioFile = fs.createWriteStream(audioPath);

    // Todo: There is trouble with getting
    //  russian pronounsation, need to correct that
    https.get(audioUrl, function (response) {
        response.pipe(audioFile);

        if (typeof (callback) == 'function')
            callback(null, audioPath);
    }, callback);
}

module.exports = router;