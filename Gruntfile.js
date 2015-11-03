/* eslint-disable */

module.exports = function (grunt) {

  /*
   * Load required Grunt tasks. These are installed based on the versions listed
   * in `package.json` when you do `npm install` in this directory.
   */
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-continue');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-sass');

  /*
   * Load in our JavaScript Libraries
   */
  var vendorConfig = require('./vendor.config.js');

  /*
   * Load in our build configuration
   */
  var userConfig = {
    /*
     * The `dev_build_dir` folder is where our projects are compiled during
     * development and the `prod_build_dir` folder is where our app resides once it's
     * completely built.
     */
    dev_build_dir: 'public',
    prod_build_dir: 'production',

    /*
     * This is a collection of file patterns that refer to our app source code
     */
    app_files: {
      js: ['src/app/**/*.js', '!src/app/**/*.spec.js', '!src/app/**/*.e2e.js', '!src/assets/**/*.js'],
      jsunit: ['src/app/**/*.spec.js'],
      e2e: ['src/app/**/*.e2e.js'],
      atpl: ['src/app/**/*.tpl.html'],
      html: ['src/index.html'],
      sass: 'src/styles/main.scss'
    },

    /*
     * Configure the JavaScript vendor files
     */
    vendor_files: vendorConfig

  };

  /*
   * This is the configuration object Grunt uses to give each plugin its
   * instructions.
   */
  var taskConfig = {
    /*
     * We read in our `package.json` file so we can access the package name and
     * version. It's already there, so we don't repeat ourselves here.
     */
    pkg: grunt.file.readJSON('package.json'),

    /*
     * The banner is the comment that is placed at the top of our compiled
     * source files. It is first processed as a Grunt template, where the `<%=`
     * pairs are evaluated based on this very configuration object.
     */
    meta: {
      banner: '/**\n' +
      ' * <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' *\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' */\n'
    },

    /*
     * The directories to delete when `grunt clean` is executed.
     */
    clean: {
      build: {
        src: ['<%= dev_build_dir %>', 'reports/'],
        options: {
          force: true
        }
      },
      compile: {
        src: ['<%= prod_build_dir %>'],
        options: {
          force: true
        }
      }
    },

    /*
     * The `copy` task just copies files from A to B. We use it here to copy
     * our project assets (images, fonts, etc.) and Javascript files into
     * `dev_build_dir`, and then to copy the assets to `prod_build_dir`.
     */
    copy: {
      build_module_assets: {
        files: [
          {
            dest: '<%= dev_build_dir %>/assets/',
            src: ['src/app/**/assets/**/*.*'],
            cwd: '.',
            expand: true,
            flatten: true
          }
        ]
      },

      build_app_assets: {
        files: [
          {
            src: ['**'],
            dest: '<%= dev_build_dir %>/assets/',
            cwd: 'src/assets',
            expand: true
          }
        ]
      },
      build_appjs: {
        files: [
          {
            src: ['<%= app_files.js %>'],
            dest: '<%= dev_build_dir %>/',
            cwd: '.',
            expand: true
          }
        ]
      },
      build_vendorjs: {
        files: [
          {
            src: ['<%= vendor_files.js %>'],
            dest: '<%= dev_build_dir %>/',
            cwd: '.',
            expand: true
          }
        ]
      },
      compile_assets: {
        files: [
          {
            src: ['**'],
            dest: '<%= prod_build_dir %>/assets',
            cwd: '<%= dev_build_dir %>/assets',
            expand: true
          }
        ]
      }
    },

    /*
     * `grunt concat` concatenates multiple source files into a single file.
     */
    concat: {

      /*
       * The `build_css` target concatenates compiled CSS and vendor CSS
       * together.
       */
      build_css: {
        src: [
          '<%= dev_build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
        ],
        dest: '<%= dev_build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
      },

      /*
       * The `compile_js` target is the concatenation of our application source
       * code and all specified vendor source code into a single file.
       */
      compile_js: {

        options: {
          banner: '<%= meta.banner %>'
        },

        /*
         * Wraps all javascript app code into a closure
         * to prevent polluting the global namespace
         */
        src: [
          '(function ( window, angular, undefined ) {',
          '<%= vendor_files.js %>',
          '<%= dev_build_dir %>/src/**/*.js',
          '<%= html2js.app.dest %>',
          '})( window, window.angular );'
        ],
        dest: '<%= prod_build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
      }
    },

    /*
     * `ngAnnotate` annotates the sources before minifying. That is, it allows us
     * to code without the array syntax.
     */
    ngAnnotate: {
      compile: {
        files: [
          {
            src: ['<%= app_files.js %>'],
            cwd: '<%= dev_build_dir %>',
            dest: '<%= dev_build_dir %>',
            expand: true
          }
        ]
      }
    },

    /*
     * Minify the sources!
     */
    uglify: {
      compile: {
        files: {
          '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
        }
      }
    },

    /*
     * This task handles our SASS compilation and uglification automatically.
     * Only our `main.scss` file is included in compilation. All other files
     * must be imported from this file.
     */
    sass: {
      build: {
        options: {
          sourceMap: true,
          outputStyle: 'expanded'
        },
        files: {
          '<%= dev_build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css': '<%= app_files.sass %>'
        }
      },
      compile: {
        options: {
          sourceMap: false,
          outputStyle: 'compressed'
        },
        files: {
          '<%= dev_build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css': '<%= app_files.sass %>'
        }
      }
    },

    /*
     * HTMLMIN is a Grunt plugin that takes all of your html template files and
     * and minifies them by removing comments, white spaces, etc.
     * This plugin is used in combination with the 'html2js' and it's called before
     * to minimise the html before is put in the AngularJS templateCache.
     */
    htmlmin: {
      index: {                              // Selects only the main 'index.html' file
        options: {                          // Target options
          removeComments: true,             // Strip HTML comments
          removeCommentsFromCDATA: true,    // Strip HTML comments from scripts and styles
          minifyJS: true,                   // Minify JavaScript inside script tags
          collapseWhitespace: true          // Remove white spaces
        },
        files: {
          '<%= prod_build_dir %>/index.html': '<%= prod_build_dir %>/index.html'
        }
      }
    },

    /*
     * HTML2JS is a Grunt plugin that takes all of your template files and
     * places them into JavaScript files as strings that are added to
     * AngularJS's template cache. This means that the templates too become
     * part of the initial payload as one JavaScript file. Neat!
     */
    html2js: {
      /*
       * These are the templates from `src/app`.
       */
      app: {
        options: {
          module: 'app.templates',
          quoteChar: '\'',
          fileHeaderString: '/* eslint-disable  */',
          fileFooterString: '/* eslint-enable  */',
          base: 'src/app'
        },
        src: ['<%= app_files.atpl %>'],
        dest: '<%= dev_build_dir %>/app.templates.js'
      },

      /*
       * These are the minified templates
       */
      min: {
        options: {
          module: 'app.templates',
          quoteChar: '\'',
          fileHeaderString: '/* eslint-disable */',
          fileFooterString: '/* eslint-enable  */',
          base: 'src/app',
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          }
        },
        src: ['<%= app_files.atpl %>'],
        dest: '<%= dev_build_dir %>/app.templates.js'
      }

    },

    /*
     * The Karma configurations.
     */
    karma: {
      options: {
        configFile: '<%= dev_build_dir %>/karma-unit.js'
      },
      continuous: {
        singleRun: true
      }
    },

    /*
     * This task compiles the karma template so that changes to its file array
     * don't have to be managed manually.
     */
    karmaconfig: {
      unit: {
        dir: '<%= dev_build_dir %>',
        src: ['<%= vendor_files.js %>', '<%= html2js.app.dest %>']
      }
    },

    parseUnit: {
      all: {
        dir: '<%= dev_build_dir %>',
        src: ['<%= app_files.jsunit %>']
      }
    },

    parseE2E: {
      all: {
        dir: '<%= dev_build_dir %>',
        src: ['<%= app_files.e2e %>']
      }
    },

    /*
     * The `index` task compiles the `index.html` file as a Grunt template. CSS
     * and JS files co-exist here but they get split apart later.
     */
    index: {

      /*
       * During development, we don't want to have wait for compilation,
       * concatenation, minification, etc. So to avoid these steps, we simply
       * add all script files directly to the `<head>` of `index.html`. The
       * `src` property contains the list of included files.
       */
      build: {
        dir: '<%= dev_build_dir %>',
        src: [
          '<%= vendor_files.js %>',
          '<%= dev_build_dir %>/src/**/*.js',
          '<%= html2js.app.dest %>',
          '<%= dev_build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
        ]
      },
      /*
       * When it is time to have a completely compiled application, we can
       * alter the above to include only a single JavaScript and a single CSS
       * file. Now we're back!
       */
      compile: {
        dir: '<%= prod_build_dir %>',
        src: [
          '<%= concat.compile_js.dest %>',
          '<%= dev_build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
        ]
      }
    },

    /*
     * Configure Express server --port 9000
     */
    express: {
      development: {
        options: {
          port: 9000,
          //hostname: 'localhost',
          serverreload: false,
          bases: '<%= dev_build_dir %>',
          livereload: true
        }
      },
      production: {
        options: {
          port: 9000,
          serverreload: false,
          bases: '<%= prod_build_dir %>',
          livereload: false
        }
      }
    },

    /*
     * This task allows Grunt to run external tools (e.g. nodejs, serve, etc)
     */
    run: {
      public: {
        exec: 'serve --cors --port 31000 ' + '<%= dev_build_dir %>/'
      },
      production: {
        exec: 'serve --cors --port 32000 ' + '<%= prod_build_dir %>/'
      },
      reports: {
        exec: 'serve --port 22000 reports/coverage/lcov-report'
      },
      protractor: {
        exec: 'protractor protractor.config.js'
      }
    },

    eslint: {
      options: {
        configFile: '.eslintrc',

        /* Available formats: stylish, compact, checkstyle, junit,  */
        format: 'stylish'
      },
      target: ['src/app/**/*.js', '!src/app/**/*.spec.js', '!src/app/**/*.e2e.js']
    },

    /*
     * And for rapid development, we have a watch set up that checks to see if
     * any of the files listed below change, and then to execute the listed
     * tasks when they do. This just saves us from having to type 'grunt' into
     * the command-line every time we want to see what we're working on; we can
     * instead just leave 'grunt watch' running in a background terminal.
     *
     * But we don't need the same thing to happen for all the files.
     */
    delta: {
      /*
       * When our JavaScript source files change, we want to run lint them and
       * run our unit tests.
       */
      jssrc: {
        files: ['<%= app_files.js %>'],
        /*
         * Changes are detected but unit tests are not run
         * this creates faster live reload sessions
         */
        tasks: ['newer:eslint', 'newer:copy:build_appjs' ],
        options: {
          spawn: false,
          livereload: true
        }
      },

      /*
       * When a JavaScript unit test file changes, we only want to lint it and
       * run the unit tests. We don't want to do any live reloading.
       */
      jsunit: {
        files: [
          '<%= app_files.jsunit %>'
        ],
        tasks: [ 'newer:eslint', 'karmaconfig:unit', 'karma:continuous'],
        options: {
          spawn: false,
          livereload: false
        }
      },

      e2e: {
        files: ['<%= app_files.e2e %>'],
        tasks: ['newer:eslint', 'run:protractor'],
        options: {
          spawn: false,
          livereload: false
        }
      },

      /*
       * When assets are changed, copy them. Note that this will *not* copy new
       * files, so this is probably not very useful.
       */
      assets: {
        files: ['src/assets/**/*'],
        tasks: ['newer:copy:build_app_assets'],
        options: {
          spawn: false,
          livereload: true
        }
      },

      /*
       * When index.html changes, we need to compile it.
       */
      html: {
        files: ['<%= app_files.html %>'],
        tasks: ['index:build'],
        options: {
          spawn: false,
          livereload: true
        }
      },

      /*
       * When our templates change, we only rewrite the template cache.
       */
      tpls: {
        files: ['<%= app_files.atpl %>'],
        tasks: [ 'html2js:app' ],
        options: {
          spawn: false,
          livereload: true
        }
      },

      /*
       * When any SASS or CSS changes, we need to compile them.
       */
      sass: {
        files: ['src/**/*.scss'],
        tasks: ['sass:build'],
        options: {
          spawn: false,
          livereload: true
        }
      }

    }

  };

  /*
   * Track how long each task takes to run, used to optimize
   * grunt build times
   */
  require('time-grunt')(grunt);

  /*
   * Use this function to catch events when watch is called:
   *
   *   grunt.event.on('watch', function(action, filepath) {
   *      grunt.log.write('message to console');
   *   });
   */

  grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

  /*
   * In order to make it safe to just compile or copy *only* what was changed,
   * we need to ensure we are starting from a clean, fresh build. So we rename
   * the `watch` task to `delta` (that's why the configuration var above is
   * `delta`) and then add a new task called `watch` that does a clean build
   * before watching for changes.
   */
  grunt.renameTask('watch', 'delta');
  grunt.registerTask('watch', ['development', 'express:development', 'delta']);

  /*
   * Register our own grunt tasks. The default task is the development build
   */
  grunt.registerTask('default', ['development']);
  grunt.registerTask('deploy', ['production', 'copy:deploy']);

  /*
   * The `build` task gets your app ready to run for development and testing.
   */
  grunt.registerTask('development', [
    'clean:build',
    'html2js:app',
    'eslint',
    'sass:build',
    'concat:build_css',
    'copy:build_app_assets', 'copy:build_module_assets',
    'copy:build_appjs',
    'copy:build_vendorjs', 'index:build'
  ]);

  /*
   * Run E2E tests
   */
  grunt.registerTask('run:e2e', [
    'express:development',
    'run:protractor'
  ]);

  /*
   * Run unit tests
   */
  grunt.registerTask('run:unit', [
    'karmaconfig',
    'karma:continuous'
  ]);

  /*
   * Creates and runs code coverage reports.
   */
  grunt.registerTask('reports', [
    'run:unit',
    'run:reports'
  ]);

  /*
   * This task runs code checks (ESLint), Unit Tests and E2E tests.
   * It produces reports on code coverage and unit test results.
   * Reports are stored in a 'reports' folder.
   */
  grunt.registerTask('test', [
    'clean:build',
    'eslint',
    'html2js:app',
    'sass:build',
    'concat:build_css',
    'copy:build_app_assets', 'copy:build_module_assets',
    'copy:build_appjs', 'copy:build_vendorjs', 'index:build',
    'run:unit',
    'run:e2e'
  ]);

  /*
   * The `production` task gets your app ready for deployment by concatenating and
   * minifying your code.
   */
  grunt.registerTask('production', [
    'clean:build',
    'clean:compile',
    'html2js:min',
    'test',
    'sass:compile',
    'concat:build_css',
    'copy:build_app_assets',
    'copy:build_module_assets',
    'copy:build_appjs',
    'copy:build_vendorjs',
    'index:build',
    'copy:compile_assets',
    'ngAnnotate',
    'concat:compile_js',
    'uglify',
    'index:compile',
    'htmlmin:index'
  ]);

  /*
   * A utility function to get all app JavaScript sources.
   */
  function filterForJS(files) {
    return files.filter(function (file) {
      return file.match(/\.js$/);
    });
  }

  /*
   * A utility function to get all app CSS sources.
   */
  function filterForCSS(files) {
    return files.filter(function (file) {
      return file.match(/\.css$/);
    });
  }

  /*
   * A utility function to get all app unit tests
   */
  function filterForSpecFiles(files) {
    return files.filter(function (file) {
      return file.match(/\.spec.js$/);
    });
  }

  /*
   * A utility function to get all app unit tests
   */
  function filterForE2EFiles(files) {
    return files.filter(function (file) {
      return file.match(/\.e2e.js$/);
    });
  }

  /*
   * The index.html template includes the stylesheet and javascript sources
   * based on dynamic names calculated in this Gruntfile. This task assembles
   * the list into variables for the template to use and then runs the
   * compilation.
   */
  grunt.registerMultiTask('index', 'Process index.html template', function () {
    var dirRE = new RegExp('^(' + grunt.config('dev_build_dir') + '|' + grunt.config('prod_build_dir') + ')\/', 'g');

    var jsFiles = filterForJS(this.filesSrc).map(function (file) {
      return file.replace(dirRE, '');
    });

    var cssFiles = filterForCSS(this.filesSrc).map(function (file) {
      return file.replace(dirRE, '');
    });

    grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
      process: function (contents, path) {
        return grunt.template.process(contents, {
          data: {
            scripts: jsFiles,
            styles: cssFiles,
            version: grunt.config('pkg.version'),
            author: grunt.config('pkg.author'),
            date: grunt.template.today("yyyy")
          }
        });
      }
    });
  });

  /*
   * In order to avoid having to specify manually the files needed for karma to
   * run, we use grunt to manage the list for us. The `karma/*` files are
   * compiled as grunt templates for use by Karma. Yay!
   */
  grunt.registerMultiTask('karmaconfig', 'Process karma config templates', function () {
    var scripts = filterForJS(this.filesSrc);

    grunt.file.copy('karma/karma-unit.tpl.js', grunt.config('dev_build_dir') + '/karma-unit.js', {
      process: function (contents, path) {
        return grunt.template.process(contents, {
          data: {
            scripts: scripts
          }
        });
      }
    });

  });

  grunt.registerMultiTask('parseUnit', 'Parse unit test files', function () {
    var jsFiles = filterForSpecFiles(this.filesSrc);

    grunt.log.writeln('Unit test files:');
    grunt.log.writeln(JSON.stringify(jsFiles));
  });

  grunt.registerMultiTask('parseE2E', 'Parse E2E test file', function () {
    var jsFiles = filterForE2EFiles(this.filesSrc);

    grunt.log.writeln('E2E test files:');
    grunt.log.writeln(JSON.stringify(jsFiles));
  });

};
/* eslint-enable */
