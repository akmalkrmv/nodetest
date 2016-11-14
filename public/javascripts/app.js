var app = angular.module("app", []);



app.controller("userCtrl", ["$scope","$http", function ($scope, $http) {
    $http.get("/api/user/")
        .then(function (response) {
            $scope.userCount = Object.keys(response.data).length;
        });
}]);
