var app = angular.module("app")
    .service('TrainingService', TrainingService)
    .controller("TrainingCtrl", TrainingController);

TrainingService.$inject = ['$http'];
TrainingController.$inject = ['$scope', '$http', 'TrainingService'];

function TrainingService() {}

function TrainingController($scope) {

    $scope.trainings = [
        {name: 'Slovo perevod'},
        {name: 'Perevod slovo'},
    ];

}
