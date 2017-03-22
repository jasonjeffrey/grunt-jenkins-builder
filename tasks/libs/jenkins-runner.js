'use strict';

var jenkins,
    jenkinsapi = require('jenkins-api');

function buildAuthUrl(url, username, password) {
  var protocolRegExp = /https:\/\/|http:\/\//,
      protocol = '';

  if (url.indexOf('http') > -1) {
    protocol = protocolRegExp.exec(url)[0];
    url = url.replace(protocolRegExp, '');
  }

  return protocol + username + ':' + password + '@' + url;
}

exports.startJenkinsJob = function (grunt, options, callback) {
  var onComplete = function (err) {
    if (err) {
      grunt.fail.fatal(err);
    }

    callback();
  },
  url = options.jenkinsUrl;

  if (options.auth) {
    url = buildAuthUrl(url, options.auth.username, options.auth.password);
  }

  jenkins = jenkinsapi.init(url);

  if (options.parameters) {
    jenkins.build(options.jobName, options.parameters, onComplete);
  } else {
    jenkins.build(options.jobName, onComplete);
  }
};