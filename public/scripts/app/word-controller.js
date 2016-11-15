var app = angular.module("app", []);

app.controller("WordCtrl", ["$scope", "$http", function ($scope, $http) {

    loadAll();

    function loadAll() {
        $http.get("/api/word/").then(function (response) {
            $scope.words = response.data;
        });
    }

    $scope.create = function () {
        $http.post("/api/word/", $scope.newUser).then(function (response) {
            //$scope.words = response.data;
            //$scope.newWord = new Word();
        });
    }

    $scope.update = function (word) {
        $http.put("/api/word/" + word._id, word).then(function (response) {
            //$scope.words = response.data;
        });
    }

    $scope.remove = function (event, word) {
        event.preventDefault();
        if (!confirm('Are you sure to delete this?')) return;

        $http.delete("/api/word/" + word._id).then(function (response) {
            // $scope.words = response.data;
            var index = $scope.words.indexOf(word);
            $scope.words.splice(index, 1);
        });
    }

}]);


