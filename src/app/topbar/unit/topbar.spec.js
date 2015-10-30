describe('TopbarCtrl ', function () {

  var controller, scope;

  beforeEach(module('app.topbar'));

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('TopbarCtrl', {
      $scope: scope
    });
  }));

});
