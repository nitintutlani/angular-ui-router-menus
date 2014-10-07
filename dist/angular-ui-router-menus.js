/**
 * angular-ui-router state derived menu, nav, navbar, tab and other navigation tools
 * @version v0.1.0-dev-2014-10-08
 * @link https://github.com/nitintutlani/angular-ui-router-menus
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function (window, angular, undefined) {
"use strict";
// Source: src/ui_router_menus.js
var menus = angular.module('ui.router.menus', ['ng', 'ui.router']);

// Source: src/directives/menus.js
menus.directive('menus', [
  '$compile',
  '$rootScope',
  'menus',
  function($compile, $rootScope, menus) {
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

// Source: src/services/menus.js
menus.provider('menus', function MenusProvider() {
var compile;

  function defaultCompiler(state) {
    if(!state.menu) { return null; }

    if(typeof state.menu === 'string') {
      state.menu = {
        name: state.menu
      };
    } else {
      return state.menu;
    }
  }

  compile = defaultCompiler;

  function reload($state, menus) {
    var menu;

    menus.length = 0;

    angular.forEach($state.get(), function(state) {
      menu = compile(state); //?state.self
      if(menu) { menus.unshift(menu); }
    });
    return menus;
  }

  // Public Interface

  this.compileWith = function(customCompiler) {
    var compile = customCompiler || defaultCompiler;
    return compile;
  };

  this.$get = [
    '$rootScope',
    '$state',
    function($rootScope, $state) {
      var menus = [];
      reload($state, menus);
      return menus;
    }
  ];

});})(window, window.angular);