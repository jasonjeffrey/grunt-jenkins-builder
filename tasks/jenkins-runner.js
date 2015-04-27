var jenkinsRunner = require('./libs/jenkins-runner');

module.exports = function (grunt) {
  grunt.registerTask('jenkins-runner', 'run a jenkins job', function() {
    var done = this.async();

    jenkinsRunner.startJenkinsJob(grunt, this.options, function () {
      done();
    });
  });
};