menus.directive('menus', [
  '$compile',
  '$rootScope',
  'menus',
  function($compile, $rootScope, menus) {
    'use strict';

    return {
      link: {
        pre: function link(scope, element, attrs) {
          /* jshint unused: false */ /* for element, attrs */
          scope.menus = menus;
        }
      },
      restrict: 'AC'
    };
  }
]);
