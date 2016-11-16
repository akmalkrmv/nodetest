var app = angular.module("app");

app.controller("VocabularyCtrl", ["$scope", "$http", function ($scope, $http) {

    var rootUrl = '/api/vocabulary/';

    loadAll();

    function loadAll() {
        $http.get(rootUrl).then(function (response) {
            var vocabularies = response.data;
            // for (var i in vocabularies) {
            //     var vocabulary = vocabularies[i];
            //     if (vocabulary.image && vocabulary.image.data) {
            //         //vocabulary.imageSrc = 'data:' + vocabulary.image.contentType + ';base64,' + vocabulary.image.data.toString('base64');
            //         vocabulary.imageSrc = 'data:' + vocabulary.image.contentType + ';base64,' + vocabulary.image.data;
            //     }
            // }

            $scope.vocabularies = vocabularies;
        });
    }

    $scope.create = function () {
        $http.post(rootUrl, $scope.newUser).then(function (response) {
            //$scope.vocabularies = response.data;
            //$scope.newVocabulary = new Vocabulary();
        });
    }

    $scope.update = function (vocabulary) {
        $http.put(rootUrl + vocabulary._id, vocabulary).then(function (response) {
            //$scope.vocabularies = response.data;
        });
    }

    $scope.remove = function (event, vocabulary) {
        event.preventDefault();
        if (!confirm('Are you sure to delete this?')) return;

        $http.delete(rootUrl + vocabulary._id).then(function (response) {
            var index = $scope.vocabularies.indexOf(vocabulary);
            if (index >= 0)
                $scope.vocabularies.splice(index, 1);
        });
    }

    $scope.uploadImage = function () {
        var file = document.getElementById('file').files[0];
        var fileReader = new FileReader();

        $http.post(rootUrl, {
            image: file
        });

        fileReader.onloadend = function (e) {
            var vocabulary = {
                image: {
                    data: e.target.result,
                    contentType: file.type
                }
            };

            $http.post(rootUrl, vocabulary);
        };
        //fileReader.readAsBinaryString(file);
    }

}]);