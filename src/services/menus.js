uiRouterMenusModule.service('$menus', ['$state', function($state) {

  var menus;

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
    return menu;
  }

  this.findMenu = function(stateName) {
    for(var i=0; i<menus.length; i++) {
      if(stateName === menus[i].state.name) {
        return menus[i];
      }
    }
    return null;
  };

  this.parent = function(stateName) {
    var menu = this.findMenu(stateName);
    if(menu) {
      if (isDefined(menu.state.parent) && menu.state.parent) {
        return this.findMenu(menu.state.parent);
      }
      var compositeName = /^(.+)\.[^.]+$/.exec(menu.state.name);
      return compositeName ? this.findMenu(compositeName[1]) : null;
    }
    return null;
  };

  this.findByParent = function(stateName) {
    var self = this;
    var result = menus.filter(function(menu) {
      var parent = self.parent(menu.state.name);
      return parent && stateName === parent.state.name;
    });
    return result;
  };

  this.getTree = function(menu) {
    var self = this,
        nodes;
    if(!menu) {
      nodes = menus.filter(function(menu) {
        return !self.parent(menu.state.name);
      });
    } else {
      nodes = this.findByParent(menu.state.name);
    }
    forEach(nodes, function(node) {
      node.children = self.getTree(node);
    });
    return nodes;
  };

  /**
   * Get menus collection generated from states
   *
   * @param options Optional settings for returning menus collection
   * @returns {Array}
   */
  this.get = function(options) {
    options = options || {}; //optional options

    menus = []; //resulting array of menus

    // Start afresh
    var states = $state.get();

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

    //The following is a double filter loop that filters states based on menus and
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

    var type = options.type || 'list';

    if(type === 'tree') {
      return this.getTree();
    }

    return menus;
  };

}]);
