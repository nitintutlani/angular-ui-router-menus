'use strict';
/* global module, require */

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);
  var files = require('./files').files;

  grunt.initConfig({
    builddir: 'dist',
    buildtag: '-dev-' + grunt.template.today('yyyy-mm-dd'),
    clean: [ '<%= builddir %>' ],
    concat: {
      options: {
        banner: '<%= meta.banner %>\n\n'+
                '(function (window, angular, undefined) {\n'+
                '"use strict";\n',
        footer: '})(window, window.angular);',
        process: function(src, filepath) {
          return '// Source: ' + filepath + '\n' +
            src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
        }
      },
      build: {
        src: files.src,
        dest: '<%= builddir %>/<%= pkg.name %>.js'
      }
    },
    jshint: {
      beforeConcat: {
        src: ['Gruntfile.js', 'src/**/*.js']
      },
      afterConcat: {
        src: [ '<%= concat.build.dest %>' ]
      },
      options: {
        boss: true,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        globalstrict: true,
        globals: {
          angular: true
        },
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        unused: true
      }
    },
    karma: {
      coverage: {
        configFile: 'config/karma/coverage.conf.js',
        browsers: [ grunt.option('browser') || 'PhantomJS' ],
        singleRun: true
      },
      debug: {
        configFile: 'config/karma/src.conf.js',
        browsers: [ grunt.option('browser') || 'Chrome' ],
        singleRun: false,
        background: false
      },
      test: {
        configFile: 'config/karma/src.conf.js',
        browsers: [ grunt.option('browser') || 'PhantomJS' ],
        singleRun: true
      },
      dist: {
        configFile: 'config/karma/dist.conf.js',
        browsers: [ grunt.option('browser') || 'PhantomJS' ],
        singleRun: true
      },
      min: {
        configFile: 'config/karma/min.conf.js',
        browsers: [ grunt.option('browser') || 'PhantomJS' ],
        singleRun: true
      }
    },
    meta: {
      banner: '/**\n' +
        ' * <%= pkg.description %>\n' +
        ' * @version v<%= pkg.version %><%= buildtag %>\n' +
        ' * @link <%= pkg.homepage %>\n' +
        ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
        ' */'
    },
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '<%= meta.banner %>\n'
      },
      build: {
        files: {
          '<%= builddir %>/<%= pkg.name %>.min.js': ['<banner:meta.banner>', '<%= concat.build.dest %>']
        }
      }
    },
    coveralls: {
      options: {
        debug: true,
        coverage_dir: 'test/coverage/',
        dryRun: false,
        force: false,
        recursive: true
      }
    },
    watch: {
      files: ['src/*.js', 'test/**/*.js'],
      tasks: ['build']
    }
  });

  grunt.registerTask('dist', 'Perform a clean build', ['reset', 'karma:dist', 'uglify', 'karma:min']); //@todo add version bump and git push and tag tasks
  grunt.registerTask('coverage', 'Perform a coverage build', ['reset', 'karma:coverage', 'coveralls']);
  grunt.registerTask('build', 'Perform a normal build', ['reset', 'karma:dist', 'uglify', 'karma:min']);
  grunt.registerTask('reset', 'Perform a clean and concat task', ['clean', 'concat', 'jshint:afterConcat']);
  grunt.registerTask('debug', 'Perform a debug task', ['karma:debug']);
  grunt.registerTask('test', 'Perform a test build', ['karma:test']);
  grunt.registerTask('default', ['test']);
};
