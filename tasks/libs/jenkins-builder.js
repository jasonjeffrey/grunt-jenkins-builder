'use strict';

var jenkins,
    jenkinsapi = require('jenkins-api');

exports.startJenkinsJob = function (options) {
  jenkins = jenkinsapi.init(options.jenkinsUrl);

  jenkins.build(options.jobName, {}, function () {

  });
};