'use strict';

var task,
    jenkinsApi = require('jenkins-api'),
    taskLocation = '../../../tasks/libs/jenkins-runner.js';

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
    var buildOptions, buildSpy, callbackSpy;

    function createOptionsFunction(options) {
      return function () {
        return options;
      }
    }

    beforeEach(function () {
      callbackSpy = sinon.spy();
      buildOptions = {
        throwError: false
      },
          buildSpy = sinon.spy(function (jobName, params, callback) {
            var err = null;

            if (buildOptions.throwError) {
              err = 'ERROR';
            }

            if (typeof(params) === 'function') {
              params(err, 'test');
            } else {
              callback(err, 'test');
            }

          });

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

    it('should connect to a jenkins server address passed in by grunt options without parameters- successfully',
        function () {
          var jenkinsUrl = 'http://example.com',
              jobName = 'testJob';

          task.startJenkinsJob({}, createOptionsFunction({
            'jenkinsUrl': jenkinsUrl,
            'jobName': jobName
          }), callbackSpy);

          expect(jenkinsApi.init.called).to.be.ok;
          expect(jenkinsApi.init.args[0][0]).to.equal(jenkinsUrl);

          expect(buildSpy.called).to.be.ok;
          expect(buildSpy.args[0][0]).to.equal(jobName);
        });

    it('should connect to a jenkins server address passed in by grunt options without parameters - fail', function () {
      var jenkinsUrl = 'http://example.com',
          errorSpy = sinon.spy(),
          jobName = 'testJob';

      buildOptions = true;

      task.startJenkinsJob({
        fail: {
          fatal: errorSpy
        }
      }, createOptionsFunction({
        'jenkinsUrl': jenkinsUrl,
        'jobName': jobName
      }), callbackSpy);

      expect(jenkinsApi.init.called).to.be.ok;
      expect(jenkinsApi.init.args[0][0]).to.equal(jenkinsUrl);

      expect(buildSpy.called).to.be.ok;
      expect(buildSpy.args[0][0]).to.equal(jobName);
    });

    it('should connect to a jenkins server address passed in by grunt options with parameters - successfully',
        function () {
          var jenkinsUrl = 'http://example.com',
              jobName = 'testJob',
              jobParameters = {
                test: 1,
                test2: 3
              };

          task.startJenkinsJob({}, createOptionsFunction({
            'jenkinsUrl': jenkinsUrl,
            'jobName': jobName,
            'parameters': jobParameters
          }), callbackSpy);

          expect(jenkinsApi.init.called).to.be.ok;
          expect(jenkinsApi.init.args[0][0]).to.equal(jenkinsUrl);

          expect(buildSpy.called).to.be.ok;
          expect(buildSpy.args[0][0]).to.equal(jobName);
          expect(buildSpy.args[0][1]).to.equal(jobParameters);
        });

    it('should connect to a jenkins server address passed in by grunt options with auth testuser1 - successfully',
        function () {
          var jenkinsUrl = 'http://example.com',
              jobName = 'testJob';

          task.startJenkinsJob({}, createOptionsFunction({
            'jenkinsUrl': jenkinsUrl,
            'jobName': jobName,
            'auth': {
              'username': 'testuser1',
              'password': 'testpss'
            }
          }), callbackSpy);

          expect(jenkinsApi.init.called).to.be.ok;
          expect(jenkinsApi.init.args[0][0]).to.equal('http://testuser1:testpss@example.com');

          expect(buildSpy.called).to.be.ok;
          expect(buildSpy.args[0][0]).to.equal(jobName);
        });

    it('should connect to a jenkins server address passed in by grunt options with auth testuser2 - successfully',
        function () {
          var jenkinsUrl = 'http://example.com',
              jobName = 'testJob';

          task.startJenkinsJob({}, createOptionsFunction({
            'jenkinsUrl': jenkinsUrl,
            'jobName': jobName,
            'auth': {
              'username': 'testuser2',
              'password': 'testpss'
            }
          }), callbackSpy);

          expect(jenkinsApi.init.called).to.be.ok;
          expect(jenkinsApi.init.args[0][0]).to.equal('http://testuser2:testpss@example.com');

          expect(buildSpy.called).to.be.ok;
          expect(buildSpy.args[0][0]).to.equal(jobName);
        });
  });
});