var files = require('../../files');
var commonConfig = require('./common.conf');

module.exports = function(config) {
  commonConfig(config);

  config.set({
    reporters: ['coverage'],
    files: files.mergeFilesFor('karma-dist'), //karma coverage uses karma-dist files.
    preprocessors: {
      "**/dist/*.js": "coverage"
    },
    coverageReporter: {
      type: "lcov",
      dir: "test/coverage/"
    }
  });
};
