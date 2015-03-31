'use strict';

var task,
    jenkinsApi = require('jenkins-api'),
    taskLocation = '../../../tasks/libs/jenkins-builder.js';

describe('jenkins-builder task', function () {
  describe('initialisation', function () {

    beforeEach(function () {
      task = require(taskLocation);
    });

    afterEach(function () {
      delete require.cache[taskLocation]
    });

    it('should not be undefined', function () {
      expect(task).to.be.ok;
    });
  });

  describe('startJenkinsBuild', function () {
    var buildOptions = {
          throwError: false
        },
        buildSpy = sinon.spy(function (jobName, params, callback) {
          var err = null;

          if (buildOptions.throwError) {
            err = 'ERROR';
          }

          callback(err, 'test');
        });


    beforeEach(function () {
      sinon.stub(jenkinsApi, 'init', function () {
        return {
          build: buildSpy
        };
      });

      task = require(taskLocation);
    });

    afterEach(function () {
      jenkinsApi.init.restore();
      delete require.cache[taskLocation]
    });

    it('should connect to a jenkins server address passed in by grunt options - successfully', function () {
      var jenkinsUrl = 'http://example.com',
          jobName = 'testJob';

      task.startJenkinsJob({
        'jenkinsUrl': jenkinsUrl,
        'jobName': jobName
      });

      expect(jenkinsApi.init.called).to.be.ok;
      expect(jenkinsApi.init.args[0][0]).to.equal(jenkinsUrl);

      expect(buildSpy.called).to.be.ok;
      expect(buildSpy.args[0][0]).to.equal(jobName);
    });
  });
});