'use strict';

angular.module('modalHandler')
    .controller('ModalController', ['$scope', 'ModalService', function ($scope, modalHandler) {

        $scope.closeModal = function () {
            console.log('closing modal');
            modalHandler.closeAll();
        };

    }]
);