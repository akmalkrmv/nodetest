var app = angular.module("app", []);
//var User = require("../models/User").User;
var User = function (username, email) {
    var self = this;

    self.username = username;
    self.email = email;

    return self;
};

app.controller("UserCtrl", ["$scope", "$http", function ($scope, $http) {

    loadAll();

    $scope.createUser = function (str) {
        $scope.title = "Create";
        $scope.selectedUser = new User();
        $scope.method = "create()";
    }
    $scope.create = function () {
        console.log("create query");
        if (!$scope.selectedUser.email || !$scope.selectedUser.username) {
            console.log("pnx");
            return;
        }
        $http.post("/api/user/", $scope.selectedUser).then(function (response) {
            loadAll();
            $('#userModal').modal('toggle');
        });
    }

    $scope.remove = function (event, user) {
        event.preventDefault();

        if (confirm('Are you sure to delete this?')) {
            $http.delete("/api/user/" + user._id).then(function (response) {
                // $scope.users = response.data; // ebaniy zombi
                var index = $scope.users.indexOf(user);
                $scope.users.splice(index, 1);
            });
        }
    }

    $scope.selectUser = function (user, str) {
        $scope.title = "Update";
        $scope.selectedUser = user;
        $scope.method = "update()";
    }
    $scope.update = function () {
        console.log("update query");
        $http.put("/api/user/" + $scope.selectedUser._id, $scope.selectedUser).then(function (response) {
            $('#userModal').modal('toggle');
        });
    }

    $scope.$watch('users', function (newValue) {
        if (newValue === undefined) return;
        $scope.userCount = newValue.length;
    })
    $scope.save = function () {
        if (!$scope.selectedUser._id) {
            $scope.create();
        } else {
            $scope.update();
        }
    }

    function loadAll() {
        $http.get("/api/user/").then(function (response) {
            $scope.users = response.data;
        });
    }
}]);


app.controller("LanguageCtrl", ["$scope", "$http", function ($scope, $http) {

    loadAll();

    function loadAll() {
        $http.get("/api/language/").then(function (response) {
            $scope.languages = response.data;
        });
    }

    $scope.create = function () {
        $http.post("/api/language/", $scope.newUser).then(function (response) {
            //$scope.languages = response.data;
            //$scope.newLanguage = new Language();
        });
    }

    $scope.update = function (language) {
        $http.put("/api/language/" + language._id, language).then(function (response) {
            //$scope.languages = response.data;
        });
    }

    $scope.remove = function (event, language) {
        event.preventDefault();

        if (confirm('Are you sure to delete this?'))
            $http.delete("/api/language/" + language._id).then(function (response) {
                // $scope.languages = response.data;
                var index = $scope.languages.indexOf(language);
                $scope.languages.splice(index, 1);
            });
    }

}]);



app.controller("WordCtrl", ["$scope", "$http", function ($scope, $http) {

    loadAll();

    function loadAll() {
        $http.get("/api/word/").then(function (response) {
            $scope.words = response.data;
        });
    }

    $scope.create = function () {
        $http.post("/api/word/", $scope.newUser).then(function (response) {
            //$scope.words = response.data;
            //$scope.newWord = new Word();
        });
    }

    $scope.update = function (word) {
        $http.put("/api/word/" + word._id, word).then(function (response) {
            //$scope.words = response.data;
        });
    }

    $scope.remove = function (event, word) {
        event.preventDefault();

        if (confirm('Are you sure to delete this?'))
            $http.delete("/api/word/" + word._id).then(function (response) {
                // $scope.words = response.data;
                var index = $scope.words.indexOf(word);
                $scope.words.splice(index, 1);
            });
    }

}]);



app.controller("VocabularyCtrl", ["$scope", "$http", function ($scope, $http) {

    loadAll();

    function loadAll() {
        $http.get("/api/vocabulary/").then(function (response) {
            $scope.vocabularies = response.data;
        });
    }

    $scope.create = function () {
        $http.post("/api/vocabulary/", $scope.newUser).then(function (response) {
            //$scope.vocabularies = response.data;
            //$scope.newVocabulary = new Vocabulary();
        });
    }

    $scope.update = function (vocabulary) {
        $http.put("/api/vocabulary/" + vocabulary._id, vocabulary).then(function (response) {
            //$scope.vocabularies = response.data;
        });
    }

    $scope.remove = function (event, vocabulary) {
        event.preventDefault();

        if (confirm('Are you sure to delete this?'))
            $http.delete("/api/vocabulary/" + vocabulary._id).then(function (response) {
                // $scope.vocabularies = response.data;
                var index = $scope.vocabularies.indexOf(vocabulary);
                $scope.vocabularies.splice(index, 1);
            });
    }

}]);