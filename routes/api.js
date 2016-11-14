var router = require('express').Router();
var models = require("../models/models");
var User = models.User;
var Language = models.Language;
var Word = models.Word;
var Vocabulary = models.Vocabulary;

// User
router.get('/user/', function (req, res) {
    User.find(function (err, users) {
        res.json(users);
    });
});

router.get('/user/:id/', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) res.send(err);
        res.json(user);
    });
});

router.post('/user/', function (req, res) {
    var user = new User(req.body);

    user.save(function (err, thor) {
        if (err) return res.json(err);
        res.json(user);
    });
});

router.put('/user/:id/', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) res.send(err);

        user.email = req.body.email;
        user.username = req.body.username;

        user.save(function (err) {
            if (err) res.send(err);
            res.json(user);
        });
    });
});

router.delete('/user/:id/', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) res.send(err);
        res.json({ message: 'User was removed!' });
    });
});






// Language
router.get('/language/', function (req, res) {
    Language.find(function (err, languages) {
        res.json(languages);
    });
});

router.get('/language/:id/', function (req, res) {
    Language.findById(req.params.id, function (err, language) {
        if (err) res.send(err);
        res.json(language);
    });
});

router.post('/language/', function (req, res) {
    var language = new Language(req.body);

    language.save(function (err, thor) {
        if (err) return res.json(err);
        res.json(language);
    });
});

router.put('/language/:id/', function (req, res) {
    Language.findById(req.params.id, function (err, language) {
        if (err) res.send(err);

        language.name = req.body.name;
        language.save(function (err) {
            if (err) res.send(err);
            res.json(language);
        });
    });
});

router.delete('/language/:id/', function (req, res) {
    Language.findByIdAndRemove(req.params.id, function (err) {
        if (err) res.send(err);
        res.json({ message: 'Language was removed!' });
    });
});








// Word
router.get('/word/', function (req, res) {
    Word.find(function (err, words) {
        res.json(words);
    });
});

router.get('/word/:id/', function (req, res) {
    Word.findById(req.params.id, function (err, word) {
        if (err) res.send(err);
        res.json(word);
    });
});

router.post('/word/', function (req, res) {
    var word = new Word(req.body);

    Language.findById(word.languageId, function (err, language) {
        if (err) res.send(err);

        language.words.push(word);
        language.save(function (err, savedLanguage) {
            if (err) return res.json(err);

            word.save(function (err, savedWord) {
                if (err) return res.json(err);
                res.json(word);
            });
        });
    });
});

router.put('/word/:id/', function (req, res) {
    Word.findById(req.params.id, function (err, word) {
        if (err) res.send(err);

        word.text = req.body.text;
        word.languageId = req.body.languageId;
        word.vocabularyId = req.body.vocabularyId;

        word.save(function (err) {
            if (err) res.send(err);
            res.json(word);
        });
    });
});

router.delete('/word/:id/', function (req, res) {
    Word.findByIdAndRemove(req.params.id, function (err) {
        if (err) res.send(err);
        res.json({ message: 'Word was removed!' });
    });
});






// Vocabulary
router.get('/vocabulary/', function (req, res) {
    Vocabulary.find(function (err, vocabularies) {
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
        res.json({ message: 'Vocabulary was removed!' });
    });
});


module.exports = router;