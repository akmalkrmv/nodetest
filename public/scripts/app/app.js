var app = angular.module("app", []);
//var User = require("../models/User").User;

app.controller("UserCtrl", ["$scope", "$http", function ($scope, $http) {

    loadAll();

    function loadAll() {
        $http.get("/api/user/").then(function (response) {
            $scope.users = response.data;
        });
    }

    $scope.create = function () {
        $http.post("/api/user/", $scope.newUser).then(function (response) {
            //$scope.users = response.data;
            //$scope.newUser = new User();
        });
    }

    $scope.update = function (user) {
        $http.put("/api/user/" + user._id, user).then(function (response) {
            //$scope.users = response.data;
        });
    }

    $scope.remove = function (event, user) {
        event.preventDefault();

        if (confirm('Are you sure to delete this?'))
            $http.delete("/api/user/" + user._id).then(function (response) {
                // $scope.users = response.data;
                var index = $scope.users.indexOf(user);
                $scope.users.splice(index, 1);
            });
    }

}]);
