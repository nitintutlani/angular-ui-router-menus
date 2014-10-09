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
