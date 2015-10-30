/**
 * The `vendor_files.js` property in Gruntfile.js holds files to be automatically
 * concatenated and minified with our project source files.
 *
 * NOTE: Use the *.min.js version when compiling for production.
 * Otherwise, use the normal *.js version for development
 *
 */

module.exports = {
    js: [
      // utility libraries
      'vendor/jquery/dist/jquery.min.js',

      // Angular components
      'vendor/angular/angular.js',
      'vendor/angular-ui-router/release/angular-ui-router.min.js',
      'vendor/angular-resource/angular-resource.min.js',
      'vendor/angular-mocks/angular-mocks.js',

      // Local storage
      'vendor/angular-local-storage/dist/angular-local-storage.min.js',

      // Modernizer
      'vendor/modernizr/modernizr.js',

      // Foundation
      'vendor/foundation/js/foundation.min.js'
    ],
    css: [ ],
    assets: [ ]
};
