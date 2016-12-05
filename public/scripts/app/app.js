var app = angular
    .module("app", ['ngStorage', 'angular.filter'])

.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('httpTokenProvider');
    }])
    .factory('httpTokenProvider', function ($q, $localStorage) {
        return {
            request: function (config) {
                var token = $localStorage.token;
                if (token) {
                    config.headers['x-access-token'] = token;
                }
                // We can add token only for api  
                // var apiPattern = /\/api\//;
                // if (token && apiPattern.test(config.url)) {
                //     config.headers['x-access-token'] = token;
                // }
                return config || $q.when(config);
            }
        };
    })

.directive('editButton', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                modal: '@',
                action: '&',
            },
            template: '<button ng-click="action()" data-toggle="modal" data-target="{{modal}}" class="btn btn-default btn-xs">' +
                '<span class="glyphicon glyphicon-pencil"></span>&nbsp;' +
                '<span ng-transclude/>' +
                '</button>'
        }
    })
    .directive('deleteButton', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                action: '&',
            },
            template: '<button ng-click="action()" class="btn btn-danger btn-xs">' +
                '<span class="glyphicon glyphicon-trash"></span>' +
                '<span ng-transclude/>' +
                '</button>'
        }
    });