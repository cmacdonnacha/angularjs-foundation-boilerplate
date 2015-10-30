angular.module('app.layout', [
  'ui.router',
  'layout.controllers'
])

.config(function config($stateProvider) {
  $stateProvider.state('layout', {
    url: '/home',
    templateUrl: 'home/views/home.tpl.html'
  });
})

  // Initialize Foundation
.run(function($rootScope, $document) {
  $rootScope.$on('$viewContentLoaded', function () {
    $document.foundation({
      offcanvas: {
        close_on_click: true
      }
    });
  });
});
