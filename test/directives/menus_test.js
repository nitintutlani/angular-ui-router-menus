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
        inject(function($compile, menus) {
      $compile(stringMenuElement)(scope);
      expect(scope.menus).toBeDefined();
      expect(scope.menus).toEqual(menus.get());
    }));

    it('should compile the element such that ui-router directives work',
        inject(function($compile, menus) {
      var items,
          anchors,
          href = ['#/company', '#/company/about'],
          compiled = $compile(stringMenuElement)(scope);

      scope.$apply();
      items = compiled.children();
      var menuItems = menus.get();
      expect(items.length).toBe(menuItems.length);
      anchors = items.children();
      for(var i = 0; i < anchors.length; i++) {
        expect(anchors[i].text).toEqual(menuItems[i].name);
        expect(anchors[i].attributes['ui-sref'].value).toEqual(menuItems[i].state.name);
        expect(anchors[i].attributes['href'].value).toEqual(href[i]);
      }
    }));

  });

});