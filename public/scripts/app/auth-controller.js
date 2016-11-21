var app = angular.module("app");

app.controller("AuthCtrl", ["$scope", "$http","$sessionStorage", function ($scope, $http, $sessionStorage) {
    var rootUrl = '/api/auth/';
    $scope.storage = $sessionStorage;

    $scope.username = "";
    $scope.password = "";

    $scope.$watch('cookies', function (val) {
        if (!val) return;
        $scope.cookieId = val.get('id');
        console.log( $scope.cookieId);
    });

    $scope.login = function () {
        $http({
            method: 'POST',
            url: rootUrl,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'username=' + $scope.username + '&password=' + $scope.password
        })
        .success(function (response) {
            if (response.success) {
                var sessionId = response.id;
                $('#authModal').modal('toggle');
                $scope.storage.sessionId = sessionId;

            } else {
                console.log("fail");
            }
        });
    }

    $scope.logout = function () {
        $scope.storage.$reset();
        console.log($scope.storage.sessionId);
    }

}]);