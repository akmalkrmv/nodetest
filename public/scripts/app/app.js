(function () {

    angular
        .module("app", [
            'ngStorage',
            'angular.filter',
            'ngMaterial',
            'textAngular'
        ])
        .config(['$httpProvider', httpProviderConfig])
        .factory('httpTokenProvider', httpTokenProvider)

    function httpProviderConfig($httpProvider) {
        $httpProvider.interceptors.push('httpTokenProvider');
    }

    function httpTokenProvider($q, $localStorage) {
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
    }

}())