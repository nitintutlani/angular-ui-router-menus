var menuApp = angular.module('menuApp', [
  'ui.router', 'ui.router.menus'
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
        templateUrl: 'templates/home.html'
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
      .state('dropdown', {
        url: '/dropdown',
        templateUrl: 'templates/dropdown.html',
        menu: {
          name: 'Dropdown',
          tag: 'sidebar',
          priority: 1
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
        url: '#',
        menu: {
          name: 'Button 1',
          tag: 'navbar'
        }
      })
      .state('navbar.button2', {
        url: '#',
        menu: {
          name: 'Button 2',
          tag: 'navbar'
        }
      })
  ;
});
