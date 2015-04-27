#Grunt Jenkins Runner

> a grunt task to init a jenkins build from grunt

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jenkins-runner --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jenkins-runner');
```

## The "jenkins-runner" task

### Overview
In your project's Gruntfile, add a section named `jenkins-runner` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jenkins-runner: {
    options: {
      // Task-specific options go here.
    },
    your-target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.jenkinsUrl
Type: `String`
Default value: `http://www.example.com`

A URL to your jenkins build server.

#### options.jobName
Type: `String`
Default value: `test-job-1`

the name of the job you wish to run.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
