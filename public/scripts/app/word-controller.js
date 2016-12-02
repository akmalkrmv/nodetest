var app = angular.module("app")
    .service('WordService', WordService)
    .controller("WordCtrl", WordController);

WordService.$inject = ['$http'];
WordController.$inject = ['$scope', '$http', 'WordService'];

function WordService($http) {
    var self = this;
    var rootUrl = '/api/word/';

    self.loadAll = function () {
        return $http.get(rootUrl);
    }

    self.save = function (word) {
        return word._id ?
            self.update(word) :
            self.create(word);
    }

    self.create = function (word) {
        return $http.post(rootUrl, word);
    }

    self.update = function (word) {
        return $http.put(rootUrl + word._id, word);
    }

    self.remove = function (word) {
        return $http.delete(rootUrl + word._id);
    }

    self.getAudioUrl = function (word) {
        return '/audio/word/' + word._id;
    }

    self.playAudio = function ($event, word) {
        var audio = new Audio(self.getAudioUrl(word));
        audio.onloadeddata = function () {
            audio.play();
        };
    }
};

function WordController($scope, $http, WordService) {

    $scope.loadAll = function () {
        WordService.loadAll().then(function (response) {
            $scope.words = response.data;
        });

        if (!$scope.languages) {
            $http.get("/api/language/").then(function (response) {
                $scope.languages = response.data;
            });
        }
    }

    $scope.select = function (item) {
        $scope.selected = item;
    }

    $scope.save = function () {
        WordService.save($scope.selected).then($scope.loadAll);
    }

    $scope.remove = function (event, word) {
        event.preventDefault();
        if (!confirm('Are you sure to delete this?')) return;

        WordService.remove(word).then(function (response) {
            var index = $scope.words.indexOf(word);
            if (index >= 0)
                $scope.words.splice(index, 1);
        });
    }

    $scope.getAudioUrl = WordService.getAudioUrl;
    $scope.playAudio = WordService.playAudio;

    // initialize
    $scope.loadAll();
};