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

var stringMenuElement = '<ol menus>' +
    '<li ng-repeat="menu in menus">' +
    '<a ui-sref="{{menu.state.name}}">{{menu.name}}</a>' +
    '</li></ol>';
