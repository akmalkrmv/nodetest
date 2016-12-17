(function () {

    angular
        .module("app")
        .controller("AuthCtrl", AuthController);

    AuthController.$inject = ["$scope", "$http", "$localStorage"];

    function AuthController($scope, $http, $localStorage) {
        var rootUrl = '/api/auth/';
        $scope.storage = $localStorage;

        $scope.username = "";
        $scope.password = "";

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
        }
    }

})()