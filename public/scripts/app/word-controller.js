var app = angular.module("app");

app.controller("WordCtrl", ["$scope", "$http", function ($scope, $http) {

    loadAll();

    function loadAll() {
        $http.get("/api/word/").then(function (response) {
            $scope.words = response.data;
        });
    }

    $scope.create = function () {
        $http.post("/api/word/", $scope.newUser);
    }

    $scope.update = function (word) {
        $http.put("/api/word/" + word._id, word);
    }

    $scope.remove = function (event, word) {
        event.preventDefault();
        if (!confirm('Are you sure to delete this?')) return;

        $http.delete("/api/word/" + word._id).then(function (response) {
            var index = $scope.words.indexOf(word);
            if (index >= 0)
                $scope.words.splice(index, 1);
        });
    }

}]);