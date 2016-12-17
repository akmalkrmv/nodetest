(function () {

    angular
        .module('app')
        .config(function ($provide) {
            $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
        });

    var injector = angular.injector(['ng', 'app', 'ngStorage']);
    var http = injector.get('$httpBackend');

    QUnit.module('AuthCtrl', {
        beforeEach: function (assert) {
            this.$scope = injector.get('$rootScope').$new();
            var $controller = injector.get('$controller');
            $controller('AuthCtrl', {
                $scope: this.$scope
            });
        },
        afterEach: function (assert) {
            http.verifyNoOutstandingExpectation();
            http.verifyNoOutstandingRequest();
        }
    });

    QUnit.test('Should have login and logout functions', function (assert) {
        assert.ok(angular.isFunction(this.$scope.login));
        assert.ok(angular.isFunction(this.$scope.logout));
    });


    QUnit.test('Login for admin should pass', function (assert) {
        var rootUrl = '/api/auth/';
        http.expectPOST(rootUrl, {
            username: '',
            password: ''
        }).respond(400, {
            message: 'fuck you'
        });

        this.$scope.login();
        http.flush();

        assert.equal(this.$scope.errorMessage, 'fuck you');
    });

})()