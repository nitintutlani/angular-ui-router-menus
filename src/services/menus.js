menus.provider('menus', function MenusProvider() {
  'use strict';

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

});
/* jshint undef: false */ /* for menus */
