var app = angular.module("app", ['ngStorage']);

app.factory('httpRequestInterceptor', function ($q, $localStorage) {
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
});


app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
}]);


app.directive('editButton', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<button data-toggle="modal" data-target="#vocabularyModal" ng-click="select(vocabulary)" class="btn btn-default btn-xs">' +
            '<span class="glyphicon glyphicon-pencil"></span>' +
            '<span> Edit</span>' +
            '</button>'
    }
});
app.directive('deleteButton', function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<button ng-click="remove($event, category)" class="btn btn-danger btn-xs">' +
            '<span class="glyphicon glyphicon-trash"></span> <span ng-transclude/>' +
            '</button>'
    }
});