'use strict';

angular.module('modalHandler', ['ui.bootstrap']);

angular.module('modalHandler')
    .service('ModalService', ['$modal', '$timeout', function ($modal, $timeout) {

        var modals = [],
            errorModal;

        var open = function (options) {
            var modal = $modal.open(options);
            modals.push(modal);

            modal.opened.then(function () {
                $timeout(function () {
                    var focusElem = angular.element('[autofocus]');

                    if (focusElem && focusElem.length > 0) {
                        var selectionRange = focusElem.val().length * 2;

                        focusElem.focus();
                        focusElem[0].setSelectionRange(selectionRange, selectionRange);
                    }
                }, 100);
            });

            return modal;
        };

        var close = function (modal) {
            modal.close();
        };

        var closeAll = function () {
            if (modals.length > 0) {
                for (var i = 0; i < modals.length; i++) {
                    modals[i].close();
                    modals.splice(i, 1);
                }
            }
        };

        var showError = function (modalPath, title, message) {
            errorModal = $modal.open({
                backdrop: 'static',
                backdropClass: 'error',
                controller: 'ErrorModalController',
                templateUrl: modalPath,
                resolve: {
                    title: function () {
                        return title;
                    },
                    msg: function () {
                        return message;
                    }
                }
            });
        };

        var closeErrorModal = function () {
            if (errorModal) {
                errorModal.close();
            }
        };

        return {
            open: open,
            close: close,
            showError: showError,
            closeErrorModal: closeErrorModal,
            closeAll: closeAll
        };
    }]
);

angular.module('modalHandler')
    .controller('ErrorModalController', ['$scope', 'ModalService', 'title', 'msg', function ($scope, modalService, title, msg) {

        function init() {
            $scope.error = {
                title: title,
                message: msg
            };
        }

        $scope.closeErrorModal = function () {
            modalService.closeErrorModal();
        };

        init();
    }]
);