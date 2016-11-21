var app = angular.module("app");

app.controller("VocabularyCtrl", ["$scope", "$http", "WordService", function ($scope, $http, WordService) {
    var rootUrl = '/api/vocabulary/';

    $scope.loadAll = function () {
        $http.get(rootUrl).then(function (response) {
            $scope.vocabularies = response.data;
        });

        if (!$scope.words) {
            $http.get("/api/word/").then(function (response) {
                $scope.words = response.data;
            });
        }
    }

    $scope.select = function (item) {
        $scope.selected = item;
    }

    $scope.save = function () {
        if ($scope.selected && $scope.selected._id)
            $scope.update($scope.selected).then($scope.loadAll);
        else
            $scope.create().then($scope.loadAll);
    }

    $scope.create = function () {
        return $http.post(rootUrl, $scope.selected);
    }

    $scope.update = function (vocabulary) {
        return $http.put(rootUrl + vocabulary._id, vocabulary);
    }

    $scope.remove = function (event, vocabulary) {
        event.preventDefault();
        if (!confirm('Are you sure to delete this?')) return;

        $http.delete(rootUrl + vocabulary._id).then(function (response) {
            var index = $scope.vocabularies.indexOf(vocabulary);
            if (index >= 0)
                $scope.vocabularies.splice(index, 1);
        });
    }

    $scope.toAddImageActionUrl = function (vocabulary) {
        return '/api/vocabulary/' + vocabulary._id + '/image/';
    };

    $scope.getWords = function (vocabulary) {
        return vocabulary.words
            .map(function (val) {
                return val.text;
            })
            .join(' - ');
    };

    $scope.playAudio = WordService.playAudio;

    // initialize
    $scope.loadAll();

}]);