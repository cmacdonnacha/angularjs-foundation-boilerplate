describe('SampleCtrl ', function () {

  var controller, scope;

  beforeEach(module('app.sample'));

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('SampleCtrl', {
      $scope: scope
    });
  }));

  it('should set correct page title', function () {
    expect(scope.title).toBe('This is a sample component');
  });

});
