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
      inject(function (_$menus_, _$state_) {
        menus = _$menus_;
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
      inject(function (_$menus_, _$state_) {
        menus = _$menus_;
        $state = _$state_;
      });
    });

    it('should return 5 states', function() {
      var states = $state.get();
      expect(states.length).toBe(5);
    });

    it('should return 4 menus', function() {
      expect(menus.get().length).toBe(4);
    });

    it('should return 2 company menus', function() {
      expect(menus.get({tag: 'company'}).length).toBe(2);
    });

    it('should return 2 other menu', function() {
      expect(menus.get({tag: 'other'}).length).toBe(2);
    });

    it('should return 4 company|other menus', function() {
      expect(menus.get({tag: 'company other'}).length).toBe(4);
    });

    it('should return 4 other|company menus', function() {
      expect(menus.get({tag: 'other company'}).length).toBe(4);
    });

  });

  describe('tree menu states', function() {

    beforeEach(function() {
      module('ui.router', function(_$stateProvider_) {
        $stateProvider = _$stateProvider_;
        loadStates(treeMenuStates, $stateProvider);
      });
      module('ui.router.menus');
      inject(function (_$menus_, _$state_) {
        menus = _$menus_;
        $state = _$state_;
      });
    });

    it('should return 7 states', function() {
      var states = $state.get();
      expect(states.length).toBe(7);
    });

    it('should return 6 menus', function() {
      expect(menus.get().length).toBe(6);
    });

    it('find menu based on state', function() {
      menus.get(); //necessary to load menus from states
      expect(menus.findMenu('node1').state.name).toBe('node1');
      expect(menus.findMenu('node2.child1').state.name).toBe('node2.child1');
      expect(menus.findMenu('nodeCustom').state.name).toBe('nodeCustom');
      expect(menus.findMenu('unknown')).toBe(null);
    });

    it('check parent for every state', function() {
      menus.get(); //necessary to load menus from states
      expect(menus.parent('node1')).toBe(null);
      expect(menus.parent('node1.child1').state.name).toBe('node1');
      expect(menus.parent('node1.child2').state.name).toBe('node1');
      expect(menus.parent('node2')).toBe(null);
      expect(menus.parent('node2.child1').state.name).toBe('node2');
      expect(menus.parent('nodeCustom').state.name).toBe('node2');
    });

    it('find by parent', function() {
      menus.get(); //necessary to load menus from states
      var node1Children = menus.findByParent('node1');
      expect(node1Children.length).toBe(2);
      expect(node1Children[0].state.name).toBe('node1.child1');
      expect(node1Children[1].state.name).toBe('node1.child2');
      var node2Children = menus.findByParent('node2');
      expect(node2Children.length).toBe(2);
      expect(node2Children[0].state.name).toBe('node2.child1');
      expect(node2Children[1].state.name).toBe('nodeCustom');
    });

    it('get menus as tree', function() {
      var nodes = menus.get({type: 'tree', include: 'node*'});
      expect(nodes.length).toBe(2);
      expect(nodes[0].state.name).toBe('node1');
      expect(nodes[1].state.name).toBe('node2');
      expect(nodes[0].children.length).toBe(2);
      expect(nodes[0].children[0].state.name).toBe('node1.child1');
      expect(nodes[0].children[1].state.name).toBe('node1.child2');
      expect(nodes[1].children.length).toBe(2);
      expect(nodes[1].children[0].state.name).toBe('node2.child1');
      expect(nodes[1].children[1].state.name).toBe('nodeCustom');
    });

  });

});