var app = angular.module("app");

// ahaha tut prikol, toje pereputal s nodejs, dolbanniy js 
// var User = require("../models/User").User;

var User = function (username, email) {
    var self = this;

    self.username = username;
    self.email = email;

    return self;
};

app.controller("UserCtrl", ["$scope", "$http", function ($scope, $http) {

    loadAll();

    $scope.createUser = function (str) {
        $scope.selectedUser = new User();
        $scope.title = "Create";
        $scope.method = "create()";
    }
    $scope.create = function () {
        if (!$scope.selectedUser.email || !$scope.selectedUser.username) {
            return;
        }
        $http.post("/api/user/", $scope.selectedUser).then(function (response) {
            loadAll();
            $('#userModal').modal('toggle');
        });
    }

    $scope.remove = function (event, user) {
        event.preventDefault();

        if (confirm('Are you sure to delete this?')) {
            $http.delete("/api/user/" + user._id).then(function (response) {
                var index = $scope.users.indexOf(user);
                if (index >= 0)
                    $scope.users.splice(index, 1);
            });
        }
    }

    $scope.selectUser = function (user, str) {
        $scope.selectedUser = user;
        $scope.title = "Update";
        $scope.method = "update()";
    }
    $scope.update = function () {
        $http.put("/api/user/" + $scope.selectedUser._id, $scope.selectedUser).then(function (response) {
            $('#userModal').modal('toggle');
        });
    }

    $scope.save = function () {
        if (!$scope.selectedUser._id) {
            $scope.create();
        } else {
            $scope.update();
        }
    }

    function loadAll() {
        $http.get("/api/user/").then(function (response) {
            $scope.users = response.data;
        });
    }
}]);