(function () {

    angular.module("app")
        .service('TopicService', TopicService)
        .controller('TopicController', TopicController);

    TopicService.$inject = ['$http'];
    TopicController.$inject = ['$scope', '$compile', 'TopicService', 'VocabularyService'];

    function TopicService($http) {}

    function TopicController($scope, $compile, TopicService, VocabularyService) {
        var self = this;

        self.translates = [''];
        self.selectedWord = null;
        self.suggestion = null;
        self.suggestTranslate = suggestTranslate;

        var popoverHtml = '<div class="popover-words">\
                            <div ng-repeat="item in topic.translates" class="row translate-item">\
                                <div class="col-md-2"><span ng-bind="item.rating || 1" class="translate-rating"></span></div>\
                                <div class="col-md-10"><a href ng-bind="item.text"></a></div>\
                            </div>\
                            <div class="row translate-item">\
                                <div class="col-md-9"><input ng-model="topic.suggestion"></div>\
                                <div class="col-md-3"><button class="btn btn-primary btn-xs" ng-click="topic.suggestTranslate()">+add</button></div>\
                            </div>\
                           </div>';

        // initialize
        convertTopics();

        // infrastructure
        function convertTopics() {
            convertTopicElements($('.topic'));
            $('body').on('click', handlePopovers);
        }

        function handlePopovers(e) {
            var $target = $(e.target);
            var $allPopovers = $('[data-toggle="popover"]').filter(exceptTargetElement);
            var text = $target.text();
            var targetIsInPopover = $target.parents('.popover.fade.in').length;

            if (!targetIsInPopover) {
                if ($target.hasClass('topic-word')) {
                    getTranslates(text);
                    self.selectedWord = text;
                    $allPopovers.popover('hide');
                    $target.popover('show');
                } else {
                    self.selectedWord = null;
                    $allPopovers.popover('hide');
                    $('.selected').removeClass('selected');
                }
            }

            function exceptTargetElement() {
                return !$(this).is($target);
            }
        }

        function convertTopicElements($topicElement) {
            var $childElements = $topicElement.children();

            if ($childElements.length) {
                $childElements.each(function (index, element) {
                    convertTopicElements($(element));
                });
            }

            var matchExpression = /(\w+)(?![^<]*>|[^<>]*<\/)/gi;
            var htmlText = $topicElement.html().replace(matchExpression, function (match) {
                var replaceHtml = '<span class="topic-word"\
                                         ng-class="{selected: topic.selectedWord == \'' + match + '\'}"\
                                         data-toggle="popover" data-placement="bottom">' + match + '</span>';
                return replaceHtml;
            });

            $topicElement.html(htmlText).find('.topic-word').popover({
                html: true,
                trigger: 'manual',
                content: function () {
                    return $compile(popoverHtml)($scope);
                }
            });

            $compile($topicElement)($scope)
        }

        function getTranslates(text) {
            if (!text) return;
            VocabularyService.getTranslates(text).then(function (response) {
                self.translates = response.data;
            });
        }

        function suggestTranslate() {
            if (!self.selectedWord || !self.suggestion) return;
            VocabularyService.suggestTranslate(self.selectedWord, self.suggestion).then(function () {
                self.suggestion = null;
                getTranslates(self.selectedWord);
            });
        }
    }
})()