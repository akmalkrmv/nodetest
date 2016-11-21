app.controller("DictionaryCtrl", ["$scope", "$http", function ($scope, $http) {}]);

var app = angular.module("app")
    .service('DictionaryService', DictionaryService)
    .controller("DictionaryCtrl", DictionaryController);

DictionaryService.$inject = ['$http'];
DictionaryController.$inject = ['$scope', '$http', 'DictionaryService'];

function DictionaryService() {
    var self = this;
    var rootUrl = '/api/dictionary/';

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
}

function DictionaryController($scope) {
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

    $scope.getAudioUrl = function (word) {
        return WordService.getAudioUrl(word);
    }

    $scope.playAudio = function ($event, word) {
        // var audio = $($event.target).parents('td').find('audio')[0];
        // audio && audio.play();

        var audio = new Audio(WordService.getAudioUrl(word));
        audio.onloadeddata = function () {
            audio.play();
        };
    }

    // initialize
    $scope.loadAll();
}