/* eslint-disable */

module.exports = function ( karma ) {
  karma.set({
    /**
     * From where to look for files, starting with the location of this file.
     */
    basePath: '../',

    /**
     * This is the list of file patterns to load into the browser during testing.
     */
    files: [ <% scripts.forEach( function ( file ) { %> '<%= file %>', <% }); %> 'src/app/**/*.js'],

    exclude: ['src/app/**/*.e2e.js', 'src/assets/**/*.js'],

    frameworks: [ 'jasmine' ],

    plugins: [ 'karma-jasmine', 'karma-phantomjs-launcher', 'karma-coverage', 'karma-junit-reporter' ],

    preprocessors: {

      /**
       * Exclude unit test code from the coverage report
       */
      'src/**/!(*spec).js': ['coverage']
    },

    /**
     * Configure the reporters
     */
    reporters: ['progress', 'coverage', 'junit'],

    junitReporter: {
      outputFile: 'reports/junit/junit-report.xml',
      suite: ''
    },

    coverageReporter: {
      type : 'lcov',
      dir : 'reports',
      subdir: 'coverage'
    },

    /**
     * On which port should the browser connect, on which port is the test runner
     * operating, and what is the URL path for the browser to use.
     */
    colors: true,
    port: 9018,
    runnerPort: 9100,
    urlRoot: '/',

    /**
     * Log Level
     * Possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
     */
    logLevel: karma.LOG_DISABLE,

    /**
     * Disable file watching by default.
     */
    singleRun: false,
    autoWatch: false,

    /**
     * The list of browsers to launch to test on. This includes only "Firefox" by
     * default, but other browser names include:
     * Chrome, ChromeCanary, Firefox, Opera, Safari, PhantomJS
     *
     * You may also leave this blank and manually navigate your browser to
     * http://localhost:9018/ when you're running tests. The window/tab can be left
     * open and the tests will automatically occur there during the build. This has
     * the aesthetic advantage of not launching a browser every time you save.
     */
    browsers: ['PhantomJS']

  });
};
/* eslint-enable */
