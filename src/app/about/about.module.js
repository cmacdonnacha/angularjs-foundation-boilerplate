angular.module('app.about', [
  'ui.router',
  'about.controllers'
])

.config(function config($stateProvider) {
  $stateProvider.state('about', {
    url: '/about',
    templateUrl: 'about/views/about.tpl.html'
  });
});
