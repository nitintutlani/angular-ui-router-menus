/**
 * angular-ui-router state derived menu, nav, navbar, tab and other navigation tools
 * @version v0.1.0-dev-2014-10-08
 * @link https://github.com/nitintutlani/angular-ui-router-menus
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function (window, angular, undefined) {
"use strict";
// Source: src/uiRouterMenusModule.js
var uiRouterMenusModule = angular.module('ui.router.menus', ['ng', 'ui.router']);

// Source: src/directives/menus.js
uiRouterMenusModule.directive('menus', [
  '$compile',
  '$rootScope',
  'menus',
  function($compile, $rootScope, menus) {
    return {
      link: {
        pre: function link(scope, element, attrs) {
          /* jshint unused: false */ /* for element, attrs */
          scope.menus = menus.get();
        }
      },
      restrict: 'A'
    };
  }
]);

// Source: src/services/menus.js
uiRouterMenusModule.service('menus', ['$state', function($state) {

  var compile;

  function defaultCompiler(state) {
    if(!state.menu) { return null; }

    var menu;
    if(typeof state.menu === 'string') {
      menu = {
        name: state.menu,
        state: state
      };
    } else {
      menu = state.menu;
      menu.state = state;
    }
    //check name
    //check css classes
    //check other imp values
    return menu;
  }

  compile = defaultCompiler;

  function reload($state, menus) {
    menus.length = 0;

    var menu;
    angular.forEach($state.get(), function(state) {
      menu = compile(state);
      if(menu) { menus.push(menu); }
    });

    return menus;
  }

  // Public Interface

  this.compileWith = function(customCompiler) {
    var compile = customCompiler || defaultCompiler;
    return compile;
  };

  this.get = function() {
    var menus = [];
    reload($state, menus);
    return menus;
  };

}]);
})(window, window.angular);