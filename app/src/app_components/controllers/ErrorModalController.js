'use strict';

angular.module('modalHandler')
    .controller('ErrorModalController', ['$scope', function ($scope) {

        $scope.closeModal = function () {
            console.log('closing modal');
            modalHandler.closeAll();
        };
    }]
);