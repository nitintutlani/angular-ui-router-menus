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
      tag: 'company'
    }
  },
  'other': {
    url: '/other',
    menu: {
      name: 'Other',
      tag: 'other'
    }
  }
};

var tagMenuElement = '<ol menus menus-tag="company">' +
    '<li ng-repeat="menu in menus">' +
    '<a ui-sref="{{menu.state.name}}">{{menu.name}}</a>' +
    '</li></ol>';


/* Complex
 states = {
 'home': {
 url: '/home',
 templateUrl: 'view/index.html',
 menu: 'Dashboard'
 },
 'users': {
 url: '/users',
 templateUrl: 'view/users.list.html',
 controller: 'UsersListController',
 menu: {
 name: 'Users management',
 class: {
 active: 'active',
 hasChild: 'parent',
 custom: 'bg-green fg-yellow'
 }
 }
 },
 'users.edit': {
 url: '/edit/{id}',
 templateUrl: 'view/users.edit.html',
 controller: 'UsersEditController',
 menu: {
 exclude: true //excluded menu item
 }
 }
 };
 */