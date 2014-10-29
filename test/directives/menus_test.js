'use strict';

describe('Directive: `menus`', function() {

  var $stateProvider, $rootScope, scope;

  describe('String menu states', function() {

    beforeEach(function() {
      module('ui.router', function(_$stateProvider_) {
        $stateProvider = _$stateProvider_;
        loadStates(stringMenuStates, $stateProvider);
      });
      module('ui.router.menus');
      inject(function (_$rootScope_) {
        scope = _$rootScope_.$new();
      });
    });

    it('should make the menus service available to the elements scope',
        inject(function($compile, $menus) {
      $compile(stringMenuElement)(scope);
      expect(scope.menuItems).toBeDefined();
      expect(scope.menuItems).toEqual($menus.get());
    }));

    it('should compile the stringMenuElement such that ui-router directives work',
        inject(function($compile, $menus) {
      var items,
          anchors,
          href = ['#/company', '#/company/about'],
          compiled = $compile(stringMenuElement)(scope);

      scope.$apply();
      items = compiled.children();
      var menuItems = $menus.get();
      expect(items.length).toBe(menuItems.length);
      anchors = items.children();
      for(var i = 0; i < anchors.length; i++) {
        expect(anchors[i].text).toEqual(menuItems[i].name);
        expect(anchors[i].attributes['ui-sref'].value).toEqual(menuItems[i].state.name);
        expect(anchors[i].attributes['href'].value).toEqual(href[i]);
      }
    }));

    it('should compile the includeMenuElement for attributes',
        inject(function($compile, $menus) {
          var items, compiled = $compile(includeMenuElement)(scope);
          scope.$apply();
          items = compiled.children();
          var menuItems = $menus.get({include: 'company'});
          expect(items.length).toBe(menuItems.length);
        }));

  });

  describe('Tag menu states', function() {

    beforeEach(function() {
      module('ui.router', function(_$stateProvider_) {
        $stateProvider = _$stateProvider_;
        loadStates(tagMenuStates, $stateProvider);
      });
      module('ui.router.menus');
      inject(function (_$rootScope_) {
        scope = _$rootScope_.$new();
      });
    });

    it('should make the menus service available to the elements scope',
        inject(function($compile, $menus) {
      $compile(tagMenuElement)(scope);
      expect(scope.menus).toBeDefined();
      expect(scope.menus).toEqual($menus.get({tag: 'company'}));
    }));

    it('should compile the tagMenuElement such that ui-router directives work',
        inject(function($compile, $menus) {
          var items,
              anchors,
              href = ['#/company', '#/jobs'],
              compiled = $compile(tagMenuElement)(scope);

          scope.$apply();
          items = compiled.children();
          var menuItems = $menus.get({tag: 'company'});
          expect(items.length).toBe(menuItems.length);
          anchors = items.children();
          for(var i = 0; i < anchors.length; i++) {
            expect(anchors[i].text).toEqual(menuItems[i].name);
            expect(anchors[i].attributes['ui-sref'].value).toEqual(menuItems[i].state.name);
            expect(anchors[i].attributes['href'].value).toEqual(href[i]);
          }
        }));

    it('should compile the tagMenuElement for attributes',
        inject(function($compile, $menus) {
          var items, compiled = $compile(tagMenuElement)(scope);
          scope.$apply();
          items = compiled.children();
          var menuItems = $menus.get({tag: 'company'});
          expect(items.length).toBe(menuItems.length);
        }));

  });

  describe('Tree menu states', function() {

    beforeEach(function() {
      module('ui.router', function(_$stateProvider_) {
        $stateProvider = _$stateProvider_;
        loadStates(treeMenuStates, $stateProvider);
      });
      module('ui.router.menus');
      inject(function (_$rootScope_) {
        scope = _$rootScope_.$new();
      });
    });

    it('should load nodes to the elements scope',
        inject(function($compile, $menus) {
      $compile(treeMenuElement)(scope);
      expect(scope.nodes).toBeDefined();
      expect(scope.nodes).toEqual($menus.get({include: 'node*', type: 'tree'}));
    }));

    it('should compile the treeMenuElement such that ui-router directives work',
        inject(function($compile, $menus) {
          var items,
              listItems,
              compiled = $compile(treeMenuElement)(scope);
          scope.$apply();
          items = compiled.children();
          var nodes = $menus.get({include: 'node*', type: 'tree'});
          expect(items.length).toBe(nodes.length);
          listItems = items.find('ul').children();
          expect(listItems.length).toBe(4);
        }));

  });

});