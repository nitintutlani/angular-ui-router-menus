'use strict';

function loadStates(states, stateProvider) {
  for(var state in states) {
    stateProvider.state(state, states[state]);
  }
}

var stringMenuStates = {
  'company': {
    url: '/company',
    menu: 'Company'
  },
  'company.about': {
    url: '/about',
    menu: 'About Us'
  }
};

//simple traverse based on state and menu names
var stringMenuElement = '<ol menus="menuItems" >' +
    '<li ng-repeat="menu in menuItems">' +
    '<a ui-sref="{{menu.state.name}}">{{menu.name}}</a>' +
    '</li></ol>';

//filter menus based on state names. (include: state name globs)
var includeMenuElement = "<ol menus=\"menus\" include=\"company\">" +
    "<li ng-repeat=\"menu in menus\">" +
    "<a ui-sref=\"{{menu.state.name}}\">{{menu.name}}</a>" +
    "</li></ol>";

var tagMenuStates = {
  'company': {
    url: '/company',
    menu: {
      name: 'Company',
      tag: 'company'
    }
  },
  'company.about': {
    url: '/about',
    menu: {
      name: 'About Us',
      tag: 'other'
    }
  },
  'other': {
    url: '/other',
    menu: {
      name: 'Other',
      tag: 'other'
    }
  },
  'jobs': {
    url: '/jobs',
    menu: {
      name: 'Jobs',
      tag: 'company'
    }
  }
};

var tagMenuElement = "<ol menus=\"menus\" tag=\"company\">" +
    "<li ng-repeat=\"menu in menus\">" +
    "<a ui-sref=\"{{menu.state.name}}\">{{menu.name}}</a>" +
    "</li></ol>";

var treeMenuStates = {
  'node1': {
    abstract: true,
    url: '/node1',
    menu: 'node 1'
  },
  'node1.child1': {
    url: '/child1',
    menu: 'node 1 Child 1'
  },
  'node1.child2': {
    url: '/child2',
    menu: 'node 1 Child 2'
  },
  'node2': {
    abstract: true,
    url: '/node2',
    menu: 'node 2'
  },
  'node2.child1': {
    url: '/child1',
    menu: 'node 2 Child 1'
  },
  'nodeCustom': { //does not follow dot notation
    parent: 'node2',
    url: '/custom',
    menu: 'node 2 Custom'
  }
};

var treeMenuElement = "<ul menus=\"nodes\" type=\"tree\" include=\"node*\">" +
    "<li ng-repeat=\"node in nodes\">" +
    "<h3>{{node.name}}</h3>" +
      "<ul><li ng-repeat=\"child in node.children\">" +
      "<a ui-sref=\"{{child.state.name}}\">{{child.name}}</a>" +
      "</li></ul>" +
    "</li></ul>";
