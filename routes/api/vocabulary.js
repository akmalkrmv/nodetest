var router = require('express').Router();
var models = require("../../models/models");
var Vocabulary = models.Vocabulary;

// Get all
router.get('/vocabulary/', function (req, res) {
    Vocabulary
        .find()
        .populate('words')
        .populate('category')
        .exec(function (err, data) {
            if (err) res.send(err);
            res.json(data);
        });
});
// Get by id
router.get('/vocabulary/:id/', function (req, res) {
    Vocabulary
        .findById(req.params.id)
        .populate('words')
        .populate('category')
        .exec(function (err, data) {
            if (err) res.send(err);
            res.json(data);
        });
});
// Create new
router.post('/vocabulary/', function (req, res) {
    var vocabulary = new Vocabulary(req.body);

    vocabulary.save(function (err, thor) {
        if (err) return res.json(err);

        updateWords(vocabulary);
        updateCategory(vocabulary);

        res.json(vocabulary);
    });
});
// Update
router.put('/vocabulary/:id/', function (req, res) {
    var vocabulary = new Vocabulary(req.body);
    vocabulary.isNew = false;

    vocabulary.save(function (err, vocabulary) {
        if (err) res.send(err);

        updateWords(vocabulary);
        updateCategory(vocabulary);

        res.json(vocabulary);
    });
});
// Delete
router.delete('/vocabulary/:id/', function (req, res) {
    Vocabulary.findByIdAndRemove(req.params.id, function (err) {
        if (err) res.send(err);
        res.json({
            message: 'Vocabulary was removed!'
        });
    });
});


function updateWords(vocabulary) {
    Vocabulary.populate(vocabulary, "words", function (err, vocabulary) {
        vocabulary.words.forEach(function (word) {
            word.vocabulary = vocabulary;
            word.save();
        });
    });
}

function updateCategory(vocabulary) {
    Vocabulary.populate(vocabulary, "category", function (err, vocabulary) {
        vocabulary.category.vocabularies.push(vocabulary);
        vocabulary.category.save();
    });
}


module.exports = router;