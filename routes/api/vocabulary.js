var router = require('express').Router();
var ObjectId = require('mongoose').Types.ObjectId; 
var models = require("../../models/models");
var Vocabulary = models.Vocabulary;
var Word = models.Word;


// Todo: add to user model
var userLanguageId = new ObjectId('5830559b3272f5b026c72d45'); // russian language id
var systemLanguageId = new ObjectId('5830559b3272f5b026c72d43'); // english language id


// Get all
router.get('/vocabulary/', function (req, res) {
    Vocabulary
        .find()
        .populate({
            path: 'words',
            populate: {
                path: 'language',
                model: 'language'
            }
        })
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


router.get('/translate/:word', function (req, res) {
    // Todo: add to user model
    var userLanguageId = new ObjectId('5830559b3272f5b026c72d45'); // russian language id
    var match = { $regex: new RegExp(req.params.word, "i") };
    
    // Get the _ids of Word with the matching text
    Word.find({text: match }, function(err, docs) {

        // Map the docs into an array of just the _ids
        var ids = docs.map(function(doc) { return doc._id; });

        Vocabulary
            .findOne({ words: { $in: ids } })
            .populate({
                path: 'words',
                match: { language: userLanguageId }
            })
            .exec(function (err, data) {
                if (err) res.send(err);
                res.json(data && data.words);
            });
    });
});

router.get('/suggest/:word/:suggestion', function (req, res) {
    var match = { $regex: new RegExp(req.params.word, "i") };
    
    // Get the _ids of Word with the matching text
    Word.find({text: match }, function(err, docs) {

        // Map the docs into an array of just the _ids
        var ids = docs.map(function(doc) { return doc._id; });

        Vocabulary
            .findOne({ words: { $in: ids } })
            .populate({
                path: 'words',
                match: { language: userLanguageId }
            })
            .exec(function (err, vocabulary) {
                if (err) return res.send(err);

                var suggestionWord = new Word({
                    text: req.params.suggestion,
                    language: userLanguageId
                });

                if (!vocabulary) {
                    var originWord = new Word({
                        text: req.params.word,
                        language: systemLanguageId
                    });
                    originWord.save();
                    
                    vocabulary = new Vocabulary();
                    vocabulary.words.push(originWord);
                    vocabulary.save();
                }

                suggestionWord.vocabulary = vocabulary._id;
                vocabulary.words.push(suggestionWord);
                vocabulary.save();
                
                suggestionWord.save(function (err, word) {
                    if (err) return res.json(err);

                    Word.populate(word, "language", function (err, word) {
                        word.language.words.push(word);
                        word.language.save();
                    });

                    res.json(word);
                });
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