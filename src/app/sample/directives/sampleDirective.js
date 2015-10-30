angular.module('sample.directives.sampleDirective', [])

  .directive('sampleDirective', ['$window', function() {
    return {
      restrict: 'A'

    };
  }]);
