var router = require('express').Router(); 
var models = require("../../models/models");
var Topic = models.Topic;

// Get all
router.get('/topic/', function (req, res) {
    Topic
        .find()
        .exec(function (err, data) {
            if (err) res.send(err);
            res.json(data);
        });
});
// Get by id
router.get('/topic/:id/', function (req, res) {
    Topic
        .findById(req.params.id)
        .exec(function (err, data) {
            if (err) res.send(err);
            res.json(data);
        });
});
// Create new
router.post('/topic/', function (req, res) {
    var topic = new Topic(req.body);

    topic.save(function (err, thor) {
        if (err) return res.json(err);
        res.json(topic);
    });
});
// Update
router.put('/topic/:id/', function (req, res) {
    var topic = new Topic(req.body);
    topic.isNew = false;

    topic.save(function (err, topic) {
        if (err) return res.send(err);
        res.json(topic);
    });
});
// Delete
router.delete('/topic/:id/', function (req, res) {
    Topic.findByIdAndRemove(req.params.id, function (err) {
        if (err) res.send(err);
        res.json({
            message: 'Topic was removed!'
        });
    });
});