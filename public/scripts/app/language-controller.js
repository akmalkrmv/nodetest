var app = angular.module("app");

app.controller("LanguageCtrl", ["$scope", "$http", function ($scope, $http) {
    var rootUrl = '/api/language/';

    $scope.loadAll = function () {
        $http.get(rootUrl).then(function (response) {
            $scope.languages = response.data;
        });
    }

    $scope.select = function (item) {
        $scope.selected = item;
    }

    $scope.save = function () {
        if ($scope.selected && $scope.selected._id)
            $scope.update($scope.selected).then($scope.loadAll);
        else
            $scope.create().then($scope.loadAll);
    }

    $scope.create = function () {
        return $http.post(rootUrl, $scope.selected);
    }

    $scope.update = function (language) {
        return $http.put(rootUrl + language._id, language);
    }

    $scope.remove = function (event, language) {
        event.preventDefault();
        if (!confirm('Are you sure to delete this?')) return;

        $http.delete(rootUrl + language._id).then(function (response) {
            var index = $scope.languages.indexOf(language);
            if (index >= 0)
                $scope.languages.splice(index, 1);
        });
    }

    // initialize
    $scope.loadAll();
}]);