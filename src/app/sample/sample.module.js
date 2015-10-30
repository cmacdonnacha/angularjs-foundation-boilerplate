angular.module('app.sample', [
  'ui.router',
  'sample.controllers',
  'sample.services',
  'sample.directives'
])

.config(function config($stateProvider) {
  $stateProvider.state('sample', {
    url: '/sample',
    sampleUrl: 'sample/views/sample.tpl.html'
  });
});
