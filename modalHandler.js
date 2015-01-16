'use strict';

var module = angular.module('modalHandler', ['ui.bootstrap']);

module.service('ModalService', ['$modal', '$timeout', function ($modal, $timeout) {

        var modals = [],
            errorModal;


        function open(options) {
            var modal = $modal.open(options);
            modals.push(modal);

            // focus input field
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
        }

        function showError(options) {
            errorModal = $modal.open(options);
        }

        function close(modal) {
            modal.close();
        }

        function closeAll() {
            if (modals.length > 0) {
                for (var i = 0; i < modals.length; i++) {
                    modals[i].close();
                    modals.splice(i, 1);
                }
            }
        }

        return {
            open: open,
            showError: showError,
            close: close,
            closeAll: closeAll
        };
    }]
);