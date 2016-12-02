var router = require('express').Router();
var models = require("../../models/models");
var Category = models.Category;

// Category
router.get('/category/', function (req, res) {
    Category
        .find()
        .populate('vocabularies')
        .exec(function (err, categories) {
            if (err) res.send(err);
            res.json(categories);
        });
});

router.get('/category/:id/', function (req, res) {
    Category
        .findById(req.params.id)
        .populate('vocabularies')
        .exec(function (err, category) {
            if (err) res.send(err);
            res.json(category);
        });
});

router.post('/category/', function (req, res) {
    var category = new Category(req.body);

    category.save(function (err, category) {
        if (err) return res.json(err);

        Category.populate(category, "vocabularies", function (err, category) {
            category.vocabularies.forEach(function (vocabulary) {
                vocabulary.category = category;
                vocabulary.save();
            });
        });

        res.json(category);
    });
});

router.put('/category/:id/', function (req, res) {
    Category.findOneAndUpdate({
            _id: req.params.id
        },
        req.body,
        function (err, category) {
            if (err) res.send(err);
            res.json(category);
        });
});

router.delete('/category/:id/', function (req, res) {
    Category.findByIdAndRemove(req.params.id, function (err) {
        if (err) res.send(err);
        res.json({
            message: 'Category was removed!'
        });
    });
});


module.exports = router;