var router = require('express').Router();
var https = require("https");
var path = require('path');
var fs = require('fs');
var url = require('url');

var models = require("../models/models");
var Word = models.Word;

// Getting audio file by word id
router.get('/word/:id/', function (req, res) {
    Word.findById(req.params.id).populate('language').exec(function (err, word) {
        if (err) res.status(404).end();

        var text = word.text.toLowerCase();
        var cultureName = word.language.cultureName;
        var filePath = path.resolve(__dirname + '/../public/sounds/' + cultureName + '.' + text + '.mp3');

        fs.exists(filePath, function (exists) {
            if (exists) res.sendFile(filePath);
            else saveAudioFile(word, sendResult);
        });

        function sendResult(err, path) {
            if (err) res.status(404).end();
            res.sendFile(path);
        }
    });
});

function saveAudioFile(word, callback) {
    if (!word) return;

    var text = word.text.toLowerCase();
    var cultureName = word.language.cultureName || 'en-us';;

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

exports.saveAudioFile = saveAudioFile;

module.exports = router;