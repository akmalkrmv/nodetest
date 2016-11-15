var app = angular.module("app", []);

app.controller("LanguageCtrl", ["$scope", "$http", function ($scope, $http) {

    var rootUrl = '/api/language/';

    loadAll();

    function loadAll() {
        $http.get(rootUrl).then(function (response) {
            $scope.languages = response.data;
        });
    }

    $scope.create = function () {
        $http.post(rootUrl, $scope.newUser).then(function (response) {
            //$scope.languages = response.data;
            //$scope.newLanguage = new Language();
        });
    }

    $scope.update = function (language) {
        $http.put(rootUrl + language._id, language).then(function (response) {
            //$scope.languages = response.data;
        });
    }

    $scope.remove = function (event, language) {
        event.preventDefault();
        if (!confirm('Are you sure to delete this?')) return;

        $http.delete(rootUrl + language._id).then(function (response) {
            // $scope.languages = response.data;
            var index = $scope.languages.indexOf(language);
            $scope.languages.splice(index, 1);
        });
    }

}]);

