'use strict';

describe('Service: `menus`', function() {

  var $stateProvider, $state, menus;

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
      expect(menus.get().length).toBe(2);
    });

    it('should have defined name and url', function() {
      var items = menus.get();
      expect(items[0].name).toBe('Company');
      expect(items[1].state.url).toBe('/about');
    });

    it('should return 1 company menu', function() {
      expect(menus.get({include: 'company'}).length).toBe(1);
    });

    it('should return 1 company.* menu', function() {
      expect(menus.get({include: 'company.*'}).length).toBe(1);
    });

    it('should return 2 company* menu', function() {
      expect(menus.get({include: 'company*'}).length).toBe(2);
    });

    it('should return 0 unknown menu', function() {
      expect(menus.get({include: 'unknown'}).length).toBe(0);
    });

  });

  describe('Tag menu states', function() {

    beforeEach(function() {
      module('ui.router', function(_$stateProvider_) {
        $stateProvider = _$stateProvider_;
        loadStates(tagMenuStates, $stateProvider);
      });
      module('ui.router.menus');
      inject(function (_menus_, _$state_) {
        menus = _menus_;
        $state = _$state_;
      });
    });

    it('should return 4 states', function() {
      var states = $state.get();
      expect(states.length).toBe(4);
    });

    it('should return 3 menus', function() {
      expect(menus.get().length).toBe(3);
    });

    it('should return 2 company menus', function() {
      expect(menus.get({tag: 'company'}).length).toBe(2);
    });

    it('should return 1 other menu', function() {
      expect(menus.get({tag: 'other'}).length).toBe(1);
    });

    it('should return 3 company|other menus', function() {
      expect(menus.get({tag: 'company other'}).length).toBe(3);
    });

    it('should return 3 other|other menus', function() {
      expect(menus.get({tag: 'other company'}).length).toBe(3);
    });

  });

});