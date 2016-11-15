var app = angular.module("app", []);

app.controller("UserCtrl", ["$scope", "$http", function ($scope, $http) {

    var rootUrl = '/api/user/';

    loadAll();

    function loadAll() {
        $http.get(rootUrl).then(function (response) {
            $scope.users = response.data;
        });
    }

    $scope.create = function () {
        $http.post(rootUrl, $scope.newUser).then(function (response) {
            //$scope.users = response.data;
            //$scope.newUser = new User();
        });
    }

    $scope.update = function (user) {
        $http.put(rootUrl + user._id, user).then(function (response) {
            //$scope.users = response.data;
        });
    }

    $scope.remove = function (event, user) {
        event.preventDefault();
        if (!confirm('Are you sure to delete this?')) return;

        $http.delete(rootUrl + user._id).then(function (response) {
            var index = $scope.users.indexOf(user);
            $scope.users.splice(index, 1);
        });
    }

}]);

