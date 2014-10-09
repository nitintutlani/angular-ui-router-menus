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
