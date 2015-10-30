describe('AboutCtrl ', function () {

  var controller, scope;

  beforeEach(module('app.about'));

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('AboutCtrl', {
      $scope: scope
    });
  }));

  it('should set correct page title', function () {
    expect(scope.title).toBe('About Page');
  });

});
