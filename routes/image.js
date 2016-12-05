var router = require('express').Router();
var multiparty = require("multiparty");
var path = require('path');
var fs = require('fs');

var models = require("../models/models");
var Vocabulary = models.Vocabulary;

// Get image of vocabulary
router.get('/vocabulary/:id', function (req, res) {
    Vocabulary.findById(req.params.id, function (err, vocabulary) {
        if (err) res.send(err);

        var imagePath = path.resolve('./public/images/' + vocabulary._id);
        var noImagePath = path.resolve('./public/images/no-image.png');

         fs.exists(imagePath, function (exists) {
            if (exists) res.sendFile(imagePath);
            else  res.sendFile(noImagePath);
        });
    });
});

// Update image of vocabulary
router.post('/vocabulary/:id', function (req, res) {
    Vocabulary.findById(req.params.id, function (err, vocabulary) {
        if (err) res.send(err);

        var form = new multiparty.Form();
        form.on("part", function (part) {
            if (part.filename) {

                var extension = path.extname(part.filename);
                var imagePath = path.resolve('./public/images/' + vocabulary._id);
                var imageFile = fs.createWriteStream(imagePath);

                part.pipe(imageFile);

                vocabulary.imageUrl = '/image/vocabulary/' + vocabulary._id;
                vocabulary.save(function (err) {
                    if (err) res.send(err);
                    res.json(vocabulary);
                });
            }
        })

        form.parse(req);
    });
});

// Delete image of vocabulary
router.delete('/vocabulary/:id', function (req, res) {
    Vocabulary.findById(req.params.id, function (err, vocabulary) {
        if (err) res.send(err);

        vocabulary.imageUrl = null;
        vocabulary.save(function (err) {
            if (err) res.send(err);
            res.json(vocabulary);
        });
    });
});


module.exports = router;