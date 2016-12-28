(function () {

    angular.module("app")
        .service('DictionaryService', DictionaryService)
        .controller("DictionaryCtrl", DictionaryController);

    DictionaryService.$inject = ['$http'];
    DictionaryController.$inject = ['$scope', 'DictionaryService', 'WordService', 'VocabularyService'];

    function DictionaryService($http) {
        var self = this;
        var rootUrl = '/api/dictionary/';

        self.loadAll = loadAll;
        self.save = save;
        self.create = create;
        self.update = update;
        self.remove = remove;

        return self;

        function loadAll() {
            return $http.get(rootUrl);
        }

        function save(word) {
            return word._id ?
                self.update(word) :
                self.create(word);
        }

        function create(word) {
            return $http.post(rootUrl, word);
        }

        function update(word) {
            return $http.put(rootUrl + word._id, word);
        }

        function remove(word) {
            return $http.delete(rootUrl + word._id);
        }
    }

    function DictionaryController($scope, DictionaryService, WordService, VocabularyService) {

        $scope.words = [];
        $scope.selected = null;

        $scope.loadAll = loadAll;
        $scope.save = save;
        $scope.select = select;
        $scope.remove = remove;

        $scope.playAudio = WordService.playAudio;
        $scope.getAudioUrl = WordService.getAudioUrl;
        $scope.getTranslates = getTranslates;

        // initialize
        loadAll();

        // infrastructure
        function loadAll() {
            WordService.loadAll().then(function (response) {
                $scope.words = response.data;
            });
        }

        function select(item) {
            $scope.selected = item;
        }

        function save() {
            WordService.save($scope.selected).then(loadAll);
        }

        function remove(event, word) {
            event.preventDefault();
            if (!confirm('Are you sure to delete this?')) return;

            WordService.remove(word).then(function (response) {
                var index = $scope.words.indexOf(word);
                if (index >= 0) $scope.words.splice(index, 1);
            });
        }
    }

}())