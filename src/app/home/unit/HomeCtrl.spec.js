describe('HomeCtrl ', function () {

  var controller, scope;

  beforeEach(module('app.home'));

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('HomeCtrl', {
      $scope: scope
    });
  }));

  it('should set correct page title', function () {
    expect(scope.title).toBe('Home Page');
  });

});
