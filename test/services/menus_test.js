'use strict';

describe('Service: Menus', function() {

  var $stateProvider, $state, menus;

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

  describe('String menu states', function() {

    beforeEach(function() {
      module('ui.router', function(_$stateProvider_) {
        $stateProvider = _$stateProvider_;
        loadStates(stringMenuStates, $stateProvider);
      });
      module('ui.router.menus');
      inject(function (_menus_, _$state_) {
        menus = _menus_;
        $state = _$state_;
      });
    });

    it('should return 3 states', function() {
      var states = $state.get();
      //3 states: [Object{name: '', url: '^', views: null, abstract: true}, Object{name: 'blank'}, Object{name: 'blank.child'}]
      expect(states.length).toBe(3);
    });

    it('should return 2 menus', function() {
      //2 menu objects: [Object{name: 'About Us'}, Object{name: 'Company'}]
      expect(menus.get().length).toBe(2);
    });

    it('should have defined name and url', function() {
      var items = menus.get();
      expect(items[0].name).toBe('Company');
      expect(items[1].state.url).toBe('/about');
    });

  });

/*
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

});