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
