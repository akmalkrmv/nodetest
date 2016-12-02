var app = angular.module("app")
    .service('CategoryService', CategoryService)
    .controller('CategoryCtrl', CategoryController);

CategoryService.$inject = ['$http'];
CategoryController.$inject = ['$scope', 'CategoryService'];

function CategoryService($http) {
    var self = this;
    var rootUrl = '/api/category/';

    self.getAll = function () {
        return $http.get(rootUrl);
    }

    self.save = function (model) {
        return model._id ?
            self.update(model) :
            self.create(model);
    }

    self.create = function (model) {
        return $http.post(rootUrl, model);
    }

    self.update = function (model) {
        return $http.put(rootUrl + model._id, model);
    }

    self.remove = function (model) {
        return $http.delete(rootUrl + model._id);
    }
}

function CategoryController($scope, CategoryService) {
    var self = this;

    $scope.loadAll = function () {
        CategoryService.getAll().then(function (response) {
            $scope.categories = response.data;
        }, console.error);
    }

    $scope.select = function (item) {
        $scope.selected = item;
    }

    $scope.save = function () {
        CategoryService.save($scope.selected).then($scope.loadAll);
    }

    $scope.remove = function (event, model) {
        event.preventDefault();
        if (!confirm('Are you sure to delete this?')) return;

        CategoryService.remove(word).then(function (response) {
            var index = $scope.words.indexOf(word);
            if (index >= 0) $scope.categories.splice(index, 1);
        });
    }

    // initialize
    $scope.loadAll();
}