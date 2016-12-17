(function () {

    angular.module("app")
        .service('TopicService', TopicService)
        .controller('TopicCtrl', TopicController);

    TopicService.$inject = ['$http'];
    TopicController.$inject = ['$scope', 'TopicService'];

    function TopicService($http) {}

    function TopicController($scope, TopicService) {
        var self = this;


        // initialize
        loadAll();
        convertTopics();

        function loadAll() {

        }


        function convertTopics() {
            var $topic = $('.topic');
            convertTopicElements($topic);
            $('body').on('click', handlePopovers);

            function handlePopovers(e) {
                var $target = $(e.target);
                $('[data-toggle="popover"]').each(function () {
                    var $this = $(this);
                    if (!$this.is($target)) {
                        $this.popover('hide');
                    } else {
                        $scope.getTranslates($this.text());
                        $target.popover('show');
                    }
                });
            }
        }

        function convertTopicElements($topicElement) {
            var $childElements = $topicElement.children();

            if ($childElements.length) {
                $childElements.each(function (index, element) {
                    convertTopicElements($(element));
                });
            }

            var htmlText = $topicElement.html().replace(/(\w+)(?![^<]*>|[^<>]*<\/)/gi, function (match) {
                return '<span class="topic-word" data-toggle="popover" data-placement="bottom">' + match + '</span>';
            });

            $topicElement.html(htmlText);
            $topicElement.find('.topic-word').popover({
                html: true,
                trigger: 'manual',
                content: function () {
                    return $('.popover-words');
                }
            });
        }

        function getTranslates(text, callBack) {
            VocabularyService.getTranslates(text).then(function (response) {
                $scope.translates = response.data;
                if (typeof (callBack) == 'function') callBack();
            });
        }


    }

})()