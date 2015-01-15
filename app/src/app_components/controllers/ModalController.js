'use strict';

angular.module('modalHandler')
    .controller('ModalController', ['$scope', 'ModalHandler', function ($scope, modalHandler) {

        $scope.closeModal = function () {
            console.log('closing modal');
            modalHandler.closeAll();
        };

    }]
);