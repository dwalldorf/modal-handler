'use strict';

angular.module('modalHandler')
    .controller('ErrorModalController', ['$scope', 'ModalService', function ($scope, modalService) {

        $scope.closeModal = function () {
            console.log('closing modal');
            modalService.closeAll();
        };
    }]
);