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
        template: '<h1>Home</h1>'
      })
      .state('navbar', {
        url: '/navbar',
        templateUrl: 'templates/navbar.html',
        menu: {
          name: 'Nav Bar',
          tag: 'sidebar'
        }
      })
      .state('tabs', {
        url: '/tabs',
        templateUrl: 'templates/tabs.html',
        menu: {
          name: 'Tabs',
          tag: 'sidebar'
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
