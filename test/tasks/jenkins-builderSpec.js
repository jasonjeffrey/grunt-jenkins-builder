'use strict';

var task;

describe('jenkins-builder task',function () {
  describe('initialisation', function () {

    beforeEach(function () {
        task = require('../../tasks/jenkins-builder.js');
    });

    it('should not be undefined', function () {
        expect(task).to.be.ok;
    });
  })
});