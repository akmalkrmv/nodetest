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
            template: '<img ng-src="/images/no-image.png" ng-click="openFileInput($event)" src="/images/no-image.png">' +
                '<input type="file" style="display: none" onchange="angular.element(this).scope().setFile(this)">'
        }
    }




})()