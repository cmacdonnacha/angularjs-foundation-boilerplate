describe('Service: SampleService -', function () {

  var service, rootScope;

  beforeEach(module('sample.services.SampleService'));
  beforeEach(inject(function ($rootScope, SampleService) {
    rootScope = $rootScope;
    service = SampleService;
  }));

  describe('getMessage function', function () {
    beforeEach(function() {
      spyOn(service, 'getMessage').and.callThrough();
    });

    it('should exist as a function', function () {
      service.getMessage();
      expect(service.getMessage).toHaveBeenCalled();
    });

    it('should return the correct message', function () {
      var message = service.getMessage();
      expect(message).toBe('Hello, this is a sample service!');
    });
  });
});
