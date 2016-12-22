var router = require('express').Router();
var https = require("https");
var path = require('path');
var url = require('url');
var fs = require('fs');

var gitTest = 'gitTest';

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
    var cultureName = word.language.cultureName || 'en-us';
    var params = {
        q: text,
        tl: cultureName,
        ie: 'utf-8',
        client: 'tw-ob'
    };

    var audioUrl = 'https://translate.google.com/translate_tts?' + toUrlParams(params);
    var audioPath = path.resolve('./public/sounds/' + cultureName + '.' + text + '.mp3');
    var audioFile = fs.createWriteStream(audioPath);

    https.get(audioUrl, function (response) {
        response.pipe(audioFile);

        if (typeof (callback) == 'function')
            callback(null, audioPath);
    }, callback);
}

function toUrlParams(objectParams) {
    function toUrlKeyValue(key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(objectParams[key]);
    }

    return Object.keys(objectParams).map(toUrlKeyValue).join('&');
}



module.exports = {
    router: router,
    saveAudioFile: saveAudioFile
};