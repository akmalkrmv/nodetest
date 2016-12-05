var app = angular.module("app");

app.controller("AuthCtrl", ["$scope", "$http", "$localStorage", function ($scope, $http, $localStorage) {
    var rootUrl = '/api/auth/';
    $scope.storage = $localStorage;

    $scope.username = "";
    $scope.password = "";

    $scope.$watch('cookies', function (val) {
        if (!val) return;
        $scope.cookieId = val.get('id');
        console.log($scope.cookieId);
    });

    $scope.login = function () {
        $scope.errorMessage = '';
        $http
            .post(rootUrl, {
                username: $scope.username,
                password: $scope.password
            })
            .then(function (response) {
                $scope.storage.token = response.data.token;
                $scope.storage.username = $scope.username;
                $('#authModal').modal('toggle');
            }, function (response) {
                console.error(response.data.message);
                $scope.errorMessage = response.data.message;
            });
    }

    $scope.logout = function () {
        $scope.storage.$reset();
        console.log($scope.storage.sessionId);
    }

}]);
