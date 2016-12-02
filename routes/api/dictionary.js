var router = require('express').Router();
var models = require("../../models/models");
var Dictionary = models.Dictionary;
var Vocabulary = models.Vocabulary;
var Word = models.Word;


// Add to dictionary
router.post('/add/:text/', function (req, res) {

    Word
        .findOne({
            text: req.params.text
        })
        .populate('vocabulary')
        .exec(function (err, word) {
            if (err) res.send(err);

            var data = {};
            var dicitonary = new Dictionary(data);

            dicitonary.save(function (err, thor) {
                if (err) res.json(err);
                res.json(dicitonary);
            });

        });
});


module.exports = router;