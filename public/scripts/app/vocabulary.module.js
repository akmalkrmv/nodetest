var app = angular.module("app")
    .service('VocabularyService', VocabularyService)
    .controller("VocabularyCtrl", VocabularyController);

VocabularyService.$inject = ['$http'];
VocabularyController.$inject = [
    '$scope',
    '$q',
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

    self.getTranslates = function (text) {
        return $http.get('/api/translate/' + text);
    }
    self.suggestTranslate = function (text, suggestion) {
        return $http.get('/api/suggest/' + text + '/' + suggestion);
    }

    self.getWords = function (vocabulary) {
        return vocabulary.words.map(function (val) {
            return val.text;
        }).join(' - ');
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

function VocabularyController($scope, $q, VocabularyService, WordService, CategoryService) {
    var rootUrl = '/api/vocabulary/';

    $scope.showImages = true;
    $scope.vocabularies = [];
    $scope.words = [];
    $scope.categories = [];
    $scope.selected = null;

    $scope.loadAll = loadAll;
    $scope.loadWords = loadWords;
    $scope.loadCategories = loadCategories;
    $scope.querySearch = querySearch;

    $scope.select = select;
    $scope.save = save;
    $scope.remove = remove;

    $scope.openFileInput = openFileInput;
    $scope.setFile = setFile;
    $scope.previewImage = previewImage;
    $scope.removeImage = removeImage;

    $scope.getWords = VocabularyService.getWords;
    $scope.getImageUrl = VocabularyService.getImageUrl;
    $scope.playAudio = WordService.playAudio;

    // initialize
    loadAll();
    loadWords();
    loadCategories();

    function loadAll() {
        VocabularyService.loadAll().then(function (response) {
            $scope.vocabularies = response.data;
        });
    }

    function loadWords() {
        WordService.loadAll().then(function (response) {
            $scope.words = response.data;
        });
    }

    function loadCategories() {
        CategoryService.getAll().then(function (response) {
            $scope.categories = response.data;
        });
    }

    function select(item) {
        $scope.selected = item;
    }

    function save() {
        WordService.save($scope.selected).then(loadAll);
    }

    function remove(vocabulary) {
        if (!confirm('Are you sure to delete this?')) return;

        VocabularyService.remove(vocabulary).then(function (response) {
            var index = $scope.vocabularies.indexOf(vocabulary);
            if (index >= 0) $scope.vocabularies.splice(vocabulary, 1);
        });
    }

    function openFileInput($event) {
        $($event.target).parent().find('input:file').click();
    }

    function setFile(fileInputElement) {
        var file = fileInputElement.files[0];
        if (!file) return;

        if (this.vocabulary)
            $scope.selected = this.vocabulary;

        VocabularyService
            .setImage($scope.selected, file)
            .then(console.log, console.error);

        previewImage(file);
    }

    function previewImage(file) {
        var fileReader = new FileReader();
        fileReader.onload = function () {
            $scope.selected.imageUrl = fileReader.result;
        };
        fileReader.readAsDataURL(file);
    }

    function removeImage(vocabulary) {
        VocabularyService
            .removeImage(vocabulary)
            .then(function () {
                vocabulary.imageUrl = null;
            }, console.error);
    }

    function querySearch(searchText) {
        var deferred = $q.defer();

        WordService.querySearch(searchText).then(function (response) {
            console.log(response.data);
            deferred.resolve(response.data);
        });

        return deferred.promise;
    }

}