'use strict';

var jenkins,
    jenkinsapi = require('jenkins-api');

exports.startJenkinsJob = function (grunt, options, callback) {
  var onComplete = function (err) {
    if(err) {
      grunt.fail.fatal(err);
    }

    callback();
  };

  jenkins = jenkinsapi.init(options.jenkinsUrl);

  if(options.parameters) {
    jenkins.build(options.jobName, options.parameters, onComplete);
  } else {
    jenkins.build(options.jobName, onComplete);
  }
};