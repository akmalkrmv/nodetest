(function () {

    angular
        .module("app")
        .directive('imageSelector', imageSelector);

    function imageSelector() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                file: '@',
                onFileSlected: '&',
            },
            template: '<img src="/images/no-image.png" ng-src="/images/no-image.png" ng-click="openFileInput($event)" >\
                       <input type="file" style="display: none" onchange="angular.element(this).scope().setFile(this)">'
        }
    }


})()