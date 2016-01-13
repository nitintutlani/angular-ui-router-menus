# angular-ui-router-menus

[![Build Status](https://travis-ci.org/nitintutlani/angular-ui-router-menus.svg)](https://travis-ci.org/nitintutlani/angular-ui-router-menus)
[![Coverage Status](https://coveralls.io/repos/nitintutlani/angular-ui-router-menus/badge.png)](https://coveralls.io/r/nitintutlani/angular-ui-router-menus)

angular-ui-router state derived menu, nav, navbar, tab and other navigation tools

Sorry, I should have documented this earlier. Nevermind better late than never.

### Installation

 Bower
    `bower install --save angular-ui-router-menus`

 Npm (webpack/systemjs, etc)
    `npm install --save angular-ui-router-menus`

Include in angular app/html, make sure you have angular and ui-router up and working:
```
<head>
    <script src="js/angular-ui-router-menus.js"></script>
    <script>
        var myApp = angular.module('myApp', ['ui.router', 'ui.router.menus']);
    </script>
</head>
```

### Usage
In ui-router states, simply add a property called `menu` (keyword) with value string|any object. `menu` object can have any fields of your choice like `name` (keyword), `content`, `priority`, `active`, `disabled`, `tag` (keyword) etc.

```
    $stateProvider
        .state('company', {
            controller: '...',
            template: '...',
            menu: {
                name: 'company-menu',
                active: true,
                content: 'Company',
                priority: 99,
                anything: 'put any property / object'
                tag: 'sidebar topmenu'
            }
        })
        .state('company-about', {
            menu: 'About',
            tag: 'sidebar'
        })
        .state('investors', {
            menu: 'Investors',
            tag: 'topmenu'
        })
        .state('test', {
            menu: 'test'
        });
```

In templates,
#### Simple:
```
    <ul menus="menuItems">
        <li ng-repeat="menu in menuItems><a ui-sref="{{menu.state.name}}">{{menu.name}}</a></li>
    </ul>
```
> Use `menu.state` to access all state properties.

#### Ordered based on priority:
```
    <ul menus="menuItems">
        <li ng-repeat="menu in menuItems | orderBy:'-priority'"><a ui-sref="{{menu.state.name}}">{{menu.name}}</a></li>
    </ul>
```

#### Filtered based on state name:
```
    <ul menus="menuItems" include="company*">
        <li ng-repeat="menu in menuItems><a ui-sref="{{menu.state.name}}">{{menu.name}}</a></li>
    </ul>
```

#### Filtered based on tag:
```
    <ul menus="menuItems" tag="sidebar">
        <li ng-repeat="menu in menuItems><a ui-sref="{{menu.state.name}}">{{menu.name}}</a></li>
    </ul>
```

### Hierarichal menus / Tree of menu items:
By default, menu items are flattened. To maintain the tree hierarchy of states and access `menu.children` array of sub menus on each menu item:
```
    <ul menus="menuItems" type="tree">
        <li ng-repeat="menu in menuItems>
            <a ui-sref="{{menu.state.name}}">{{menu.name}}</a>
            <ul>
                <li ng-repeat="submenu in menu.children>
                    <a ui-sref="{{submenu.state.name}}">{{submenu.name}}</a>
                </li>
            </ul>
        </li>
    </ul>
```
> By default, `type='list'`.

More fun? Use glob patterns and also add multiple include/tags delimited with spaces.
```
    <ul menus="menuItems" include="company* investors">
        <li ng-repeat="menu in menuItems><a ui-sref="{{menu.state.name}}">{{menu.name}}</a></li>
    </ul>
    <ul menus="menuItems" tag="sidebar topmenu">
        <li ng-repeat="menu in menuItems><a ui-sref="{{menu.state.name}}">{{menu.name}}</a></li>
    </ul>
```

Deep dive? Inject $menus service into controller and call $menu.get|getTree.

Still not clear? Checkout `examples` folder for functional angular ui-bootstrap application using navbar and tabsets.
