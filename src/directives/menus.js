uiRouterMenusModule.directive('menus', function(menus) {
    return {
      link: {
        restrict: 'EA',
        scope: {
          menus: '=',
          type: '@',
          include: '@',
          tag: '@'
        },
        pre: function link(scope, element, attrs) {
          var menuOptions = {};
          if(isDefined(attrs.type)) { menuOptions.type =  attrs.type }
          if(isDefined(attrs.include)) { menuOptions.include =  attrs.include }
          if(isDefined(attrs.tag)) { menuOptions.tag =  attrs.tag }
          scope[attrs.menus] = menus.get(menuOptions);
        }
      }
    };
  }
);
