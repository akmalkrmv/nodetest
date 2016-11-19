var app = angular.module("app")
    .service('wordService', wordService)
    .controller("WordCtrl", wordController);

wordService.$inject = ['$http'];
wordController.$inject = ['$scope', '$http', 'wordService'];

function wordService($http) {
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
        //return '/api/word/' + word._id + '/audio';
        return '/api/audio/' + word.text;
    }
};

function wordController($scope, $http, wordService) {

    $scope.loadAll = function () {
        wordService.loadAll().then(function (response) {
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
        wordService.save($scope.selected).then($scope.loadAll);
    }

    $scope.remove = function (event, word) {
        event.preventDefault();
        if (!confirm('Are you sure to delete this?')) return;

        wordService.remove(word).then(function (response) {
            var index = $scope.words.indexOf(word);
            if (index >= 0)
                $scope.words.splice(index, 1);
        });
    }

    $scope.getAudioUrl = function (word) {
        return wordService.getAudioUrl(word);
    }

    $scope.playAudio = function ($event, word) {
        // var audio = $($event.target).parents('td').find('audio')[0];
        // audio && audio.play();

        var audio = new Audio(wordService.getAudioUrl(word));
        audio.onloadeddata = function (){
            audio.play();
        };
    }

    // initialize
    $scope.loadAll();
};