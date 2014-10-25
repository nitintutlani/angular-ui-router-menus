var menuApp = angular.module('menuApp', [
  'ui.router', 'ui.router.menus', 'ui.bootstrap'
]);

menuApp.config(function ($urlRouterProvider, $locationProvider) {
      $locationProvider.html5Mode(false);
      $urlRouterProvider.otherwise('/');
});

//sidebar state menus
//the `home` has no menu specified
//All other states belong to sidebar menu
menuApp.config(function($stateProvider) {
  $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        menu: {
          name: 'Home',
          tag: 'sidebar',
          priority: 100
        }
      })
      .state('navbar', {
        url: '/navbar',
        templateUrl: 'templates/navbar.html',
        menu: {
          name: 'Nav Bar',
          tag: 'sidebar',
          priority: 10
        }
      })
      .state('tabs', {
        url: '/tabs',
        templateUrl: 'templates/tabs.html',
        menu: {
          name: 'Tabs',
          tag: 'sidebar',
          priority: 5
        }
      })
  ;
});

//navbar button as state menus
//here `tag` property has been assigned as navbar
menuApp.config(function($stateProvider) {
  $stateProvider
      .state('navbar.button1', {
        menu: {
          name: 'Button 1',
          tag: 'navbar'
        }
      })
      .state('navbar.button2', {
        menu: {
          name: 'Button 2',
          tag: 'navbar'
        }
      })
  ;
});

menuApp.config(function($stateProvider) {
  $stateProvider
      .state('tabs.1', {
        template: 'test tab 1',
        menu: {
          name: 'Tab 1',
          active: true,
          content: 'test tab 1'
        }
      })
      .state('tabs.2', {
        menu: {
          name: 'Tab 2',
          content: 'test tab 2'
        }
      })
      .state('tabs.3', {
        menu: {
          name: 'Tab 3',
          disabled: true
        }
      })
  ;
});
