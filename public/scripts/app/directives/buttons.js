(function () {

    angular
        .module("app")
        .directive('editButton', editButton)
        .directive('deleteButton', deleteButton);

    function editButton() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                modal: '@',
                action: '&',
            },
            template: '<button ng-click="action()" data-toggle="modal" data-target="{{modal}}" class="btn btn-default btn-xs">\
                           <span class="glyphicon glyphicon-pencil"></span>&nbsp;\
                           <span ng-transclude/>\
                       </button>'
        }
    }

    function deleteButton() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                action: '&',
            },
            template: '<button ng-click="action()" class="btn btn-danger btn-xs">\
                           <span class="glyphicon glyphicon-trash"></span>\
                           <span ng-transclude/>\
                       </button>'
        }
    }

})()