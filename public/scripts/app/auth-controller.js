var app = angular.module("app", []);

app.controller("AuthCtrl", ["$scope", "$http", function ($scope, $http) {
    var rootUrl = '/api/auth/';

    $scope.username = "";
    $scope.password = "";

    $scope.login = function () {
        $http({
            method: 'POST',
            url: rootUrl,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'username=' + $scope.username + '&password=' + $scope.password
        }).success(function (response) {
            if(response.success){
                // var sessionId = {id:response.id};
                // $cookies.dotobject = sessionId;
                // $scope.usingCookies = { 'cookies.dotobject' : $cookies.dotobject, "cookieStore.get" : $cookieStore.get('dotobject') };
                // $cookieStore.put('obj', sessionId);
                // $scope.usingCookieStore = { "cookieStore.get" : $cookieStore.get('obj'), 'cookies.dotobject' : $cookies.obj, };

                $('#authModal').modal('toggle');
            }
        });
    }

    $scope.logout = function () {

    }

}]);