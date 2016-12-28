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

    QUnit.test('Should show errorMessage if not pass', function (assert) {
        var errorMessage = 'error message';
        var rootUrl = '/api/auth/';

        http.expectPOST(rootUrl, {
            username: '',
            password: ''
        }).respond(400, {
            message: errorMessage
        });

        this.$scope.login();
        http.flush();

        assert.equal(this.$scope.errorMessage, errorMessage);
    });

    QUnit.test('Should store username and token if pass', function (assert) {
        var token = 'token';
        var rootUrl = '/api/auth/';

        this.$scope.username = 'testuser';
        this.$scope.password = 'password';

        http.expectPOST(rootUrl, {
            username: this.$scope.username,
            password: this.$scope.password
        }).respond({
            token: token
        });

        this.$scope.login();
        http.flush();

        assert.equal(this.$scope.storage.token, token);
        assert.equal(this.$scope.storage.username, this.$scope.username);
    });

   QUnit.test('Should clear store when logout', function (assert) {
        this.$scope.logout();
        assert.equal(this.$scope.storage.token, undefined);
    });

})()