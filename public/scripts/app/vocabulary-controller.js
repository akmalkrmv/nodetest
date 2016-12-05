var app = angular.module("app")
    .service('VocabularyService', VocabularyService)
    .controller("VocabularyCtrl", VocabularyController);

VocabularyService.$inject = ['$http'];
VocabularyController.$inject = [
    '$scope',
    'VocabularyService',
    'WordService',
    'CategoryService'
];

function VocabularyService($http) {
    var self = this;
    var rootUrl = '/api/vocabulary/';

    self.loadAll = function () {
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

    self.getWords = function (vocabulary) {
        return vocabulary.words
            .map(function (val) {
                return val.text;
            })
            .join(' - ');
    };
    self.getImageUrl = function (vocabulary) {
        if (!vocabulary || !vocabulary.imageUrl)
            return '/images/no-image.png';
        return vocabulary.imageUrl;
    };

    self.setImage = function (vocabulary, file) {
        var url = '/image/vocabulary/' + vocabulary._id;
        var formData = new FormData();
        formData.append('file', file);

        var postOptions = {
            headers: {
                'Content-Type': undefined
            }
        };

        return $http.post(url, formData, postOptions);
    };
    self.removeImage = function (vocabulary) {
        return $http.delete('/image/vocabulary/' + vocabulary._id);
    }
}

function VocabularyController($scope, VocabularyService, WordService, CategoryService) {
    var rootUrl = '/api/vocabulary/';

    $scope.showImages = true;

    $scope.loadAll = function () {
        VocabularyService.loadAll().then(function (response) {
            $scope.vocabularies = response.data;
        });
    }
    $scope.loadWords = function () {
        WordService.loadAll().then(function (response) {
            $scope.words = response.data;
        });
    }
    $scope.loadCategories = function () {
        CategoryService.getAll().then(function (response) {
            $scope.categories = response.data;
        });
    }

    $scope.select = function (item) {
        $scope.selected = item;
    }
    $scope.save = function () {
        WordService.save($scope.selected).then($scope.loadAll);
    }
    $scope.remove = function (word) {
        if (!confirm('Are you sure to delete this?')) return;

        VocabularyService.remove(vocabulary).then(function (response) {
            var index = $scope.vocabularies.indexOf(vocabulary);
            if (index >= 0) $scope.vocabularies.splice(vocabulary, 1);
        });
    }

    $scope.openFileInput = function ($event) {
        $($event.target).parent().find('input:file').click();
    }

    $scope.setFile = function (fileInputElement) {
        var file = fileInputElement.files[0];
        if (!file) return;

        if (this.vocabulary)
            $scope.selected = this.vocabulary;

        VocabularyService
            .setImage($scope.selected, file)
            .then(console.log, console.error);

        $scope.previewImage(file);
    }

    $scope.previewImage = function (file) {
        var fileReader = new FileReader();
        fileReader.onload = function () {
            $scope.selected.imageUrl = fileReader.result;
        };
        fileReader.readAsDataURL(file);
    }

    $scope.removeImage = function (vocabulary) {
        VocabularyService
            .removeImage(vocabulary)
            .then(function () {
                vocabulary.imageUrl = null;
            }, console.error);
    }

    $scope.getWords = VocabularyService.getWords;
    $scope.getImageUrl = VocabularyService.getImageUrl;
    $scope.playAudio = WordService.playAudio;

    // initialize
    $scope.loadAll();
    $scope.loadWords();
    $scope.loadCategories();
}