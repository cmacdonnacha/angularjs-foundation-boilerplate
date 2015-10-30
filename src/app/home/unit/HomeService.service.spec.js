describe('Service: HomeService -', function () {

  var service, rootScope;

  beforeEach(module('home.services.HomeService'));
  beforeEach(inject(function ($rootScope, HomeService) {
    rootScope = $rootScope;
    service = HomeService;
  }));

  describe('getHelloMessage function', function () {
    beforeEach(function() {
      spyOn(service, 'getHelloMessage').and.callThrough();
    });

    it('should exist as a function', function () {
      service.getHelloMessage();
      expect(service.getHelloMessage).toHaveBeenCalled();
    });

    it('should return the correct message', function () {
      var message = service.getHelloMessage();
      expect(message).toBe('Ready to get started? Great! Below are some resources to help you out.');
    });
  });
});
