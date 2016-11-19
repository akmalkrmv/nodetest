var router = require('express').Router();
var https = require("https");
var path = require('path');
var fs = require('fs');

var models = require("../../models/models");
var User = models.User;
var Word = models.Word;
var Language = models.Language;
var Vocabulary = models.Vocabulary;


// Vocabulary
router.get('/vocabulary/', function (req, res) {
    Vocabulary.find().lean().exec(function (err, vocabularies) {
        for (var i in vocabularies) {
            var vocabulary = vocabularies[i];
            if (vocabulary.image && vocabulary.image.data) {
                vocabulary.imageSrc = 'data:' + vocabulary.image.contentType + ';base64,' + vocabulary.image.data.toString('base64');
            }
        }

        res.json(vocabularies);
    });
});

router.get('/vocabulary/:id/', function (req, res) {
    Vocabulary.findById(req.params.id, function (err, vocabulary) {
        if (err) res.send(err);
        res.json(vocabulary);
    });
});

router.post('/vocabulary/', function (req, res) {
    var vocabulary = new Vocabulary(req.body);
    vocabulary.save(function (err, thor) {
        if (err) return res.json(err);
        res.json(vocabulary);
    });
});


router.post('/vocabulary/:id/image', function (req, res) {

    // var data = new Buffer(req.body.image.data, 'base64');
    // var vocabulary = new Vocabulary({
    //     image: {
    //         data: data,
    //         contentType: req.body.image.contentType
    //     }
    // });

    // var vocabulary = new Vocabulary(req.body);
    // vocabulary.save(function (err, thor) {
    //     if (err) return res.json(err);
    //     res.json(vocabulary);
    // });

    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);

        //Path where image will be uploaded
        fstream = fs.createWriteStream('./public/images/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            console.log("Upload Finished of " + filename);
            res.redirect('/'); //where to go next
        });
    });

    //res.json("test");
});

router.put('/vocabulary/:id/', function (req, res) {
    Vocabulary.findById(req.params.id, function (err, vocabulary) {
        if (err) res.send(err);

        // Todo: add image
        // vocabulary.name = req.body.name;

        vocabulary.save(function (err) {
            if (err) res.send(err);
            res.json(vocabulary);
        });
    });
});

router.delete('/vocabulary/:id/', function (req, res) {
    Vocabulary.findByIdAndRemove(req.params.id, function (err) {
        if (err) res.send(err);
        res.json({
            message: 'Vocabulary was removed!'
        });
    });
});


module.exports = router;