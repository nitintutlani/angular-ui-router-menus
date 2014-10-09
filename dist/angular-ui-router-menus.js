/**
 * angular-ui-router state derived menu, nav, navbar, tab and other navigation tools
 * @version v0.1.0-dev-2014-10-10
 * @link https://github.com/nitintutlani/angular-ui-router-menus
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function (window, angular, undefined) {
"use strict";
// Source: src/common.js
/* jshint unused: false */
var isDefined = angular.isDefined,
    isFunction = angular.isFunction,
    isString = angular.isString,
    isObject = angular.isObject,
    isArray = angular.isArray,
    forEach = angular.forEach,
    extend = angular.extend,
    copy = angular.copy,
    equals = angular.equals;

/**
 * glob is a string that contains wildcards * ?
 * globs is an array of glob strings
 * globs can also be a space delimited string of glob strings
 * pattern is a regex string (not object)
 * patterns is an array of pattern strings
 */

/**
 * function globToPattern
 * converts a glob to pattern
 * Ref: https://github.com/ichuan/glob.js, original implementation has `caches` support
 *
 * @param str
 * @returns {string}
 */
function globToPattern(str) {
  // special regexp chars (., +, etc.)
  var reg = str.replace(/[.+^$()|{}]/g, function (match, offset, s) {
    return s[offset - 1] === '\\' ? match : '\\' + match;
  });
  // ? and *
  reg = reg.replace(/[?*]/g, function (match, offset, s) {
    if (s[offset - 1] === '\\') {
      return match;
    }
    return match === '?' ? '.' : '.*';
  });
  // special regexp escapings (\d, \S, etc.)
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_I++Objects/RegExp
  reg = reg.replace(/\\([dDsSwWtrnvfbB0cxu])/g, '$1');
  return '^' + reg + '$';
}

/**
 * function globsToPatterns
 * converts a globs into patterns
 *
 * @param {string}|{Array} globs
 * @returns {Array}
 */
function globsToPatterns(globs) {
  var patterns = [];
  if(isString(globs)) {
    globs = globs.split(' ');
  }
  if(isArray(globs)) {
    for(var i=0; i < globs.length; i++) {
      patterns.push(globToPattern(globs[i]));
    }
  }
  return patterns;
}

/**
 * function matchAny
 * use it to match a string with any one of the patterns
 *
 * @param patterns
 * @param str
 * @returns {boolean}
 */
function matchAny(patterns, str) {
  if(isArray(patterns)) {
    for(var i=0; i < patterns.length; i++) {
      if(!!str.match(patterns[i])) {
        return true;
      }
    }
  }
  return false;
}

/**
 * function matchGlobs
 * use it to match a string with globs
 *
 * @param globs
 * @param str
 * @returns {boolean}
 */
function matchGlobs(globs, str) {
  return matchAny(globsToPatterns(globs), str);
}

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
          /* jshint unused: false */ /* for element */
          attrs = attrs || {}; //fail safe
          var options = {}; //Future: scope.$eval(attrs.menus) || {};
          if(isDefined(attrs.include)) {//if include available
            options.include = scope.$eval(attrs.include);
          }
          if(isDefined(attrs.tag)) { //if tag available
            options.tag = scope.$eval(attrs.tag);
          }
          scope.menus = menus.get(options);
        }
      },
      restrict: 'EA'
    };
  }
]);

// Source: src/services/menus.js
uiRouterMenusModule.service('menus', ['$state', function($state) {

  //Converts a state to menu based on menu definition object.
  function compile(state) {
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
    //check name?
    //check css classes
    //check other imp values
    return menu;
  }

  /**
   *
   * @param options Optional settings for returning menus collection
   * @returns {Array}
   */
  this.get = function(options) {
    options = options || {}; //optional options

    var menus = []; //resulting array of menus

    var states = $state.get(); //fetch all states in ui-router (using $state service)

    //Filter states based on includes
    var includes = options.include || null;
    if(includes) {
      includes = globsToPatterns(includes);
      states = states.filter(function(state) {
        return matchAny(includes, state.name);
      });
    }

    var tags = options.tag || null;
    if(tags) { tags = globsToPatterns(tags); }

    forEach(states, function(state) {
      var menu = compile(state);
      if(menu) { //push only if a valid menu is returned
        if(tags) { //filter menus for tags
          if(isDefined(menu.tag)) { //only if menu has a tag, skip tag less menu items
            if(matchAny(tags, menu.tag)) {
              menus.push(menu);
            }
          }
        } else {
          menus.push(menu); //always push as no tags filter applied
        }
      }
    });

    return menus;
  };

}]);
})(window, window.angular);