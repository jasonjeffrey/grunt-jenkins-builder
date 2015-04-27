'use strict';

var jenkins,
    jenkinsapi = require('jenkins-api');

exports.startJenkinsJob = function (grunt, options) {
  done = this.async();
  jenkins = jenkinsapi.init(options.jenkinsUrl);

  jenkins.build(options.jobName, options.parameters, function (err) {
      if(err) {
        grunt.fail.fatal(err);
      }

    done();
  });
};