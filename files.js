var pkg = require('./package.json');

var pkgFiles = {
  karma: [
    'bower_components/angular/angular.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'src/common.js',
    'test/helpers.js'
  ],
  'karma-tests': [
    'test/**/*_test.js'
  ],
  'karma-dist': [
    '@karma',
    'dist/' + pkg.name + '.js',
    '@karma-tests'
  ],
  'karma-min': [
    '@karma',
    'dist/' + pkg.name + '.min.js',
    '@karma-tests'
  ],
  'karma-src': [
    '@karma',
    'src/common.js',
    'src/uiRouterMenusModule.js',
    'src/**/*.js',
    '@karma-tests'
  ],
  'karma-src-exclude': [],
  dist: [
    'dist/' + pkg.name + '.js'
  ],
  src: [
    'src/common.js',
    'src/uiRouterMenusModule.js',
    'src/directives/menus.js',
    'src/services/menus.js'
  ]
};

if (exports) {
  exports.files = pkgFiles;
  exports.mergeFilesFor = function() {
    var files = [];

    Array.prototype.slice.call(arguments, 0).forEach(function(filegroup) {
      pkgFiles[filegroup].forEach(function(file) {
        // replace @ref
        var match = file.match(/^\@(.*)/);
        if (match) {
          files = files.concat(pkgFiles[match[1]]);
        } else {
          files.push(file);
        }
      });
    });

    return files;
  };
}
