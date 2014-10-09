var files = require('../../files');
var commonConfig = require('./common.conf');

module.exports = function(config) {
  commonConfig(config);

  config.set({
    files: files.mergeFilesFor('karma-build'), //karma coverage uses karma-build files.
    preprocessors: {
      "**/build/*.js": "coverage"
    },
    coverageReporter: {
      type: "lcov",
      dir: "test/coverage/"
    }
  });
};
