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
