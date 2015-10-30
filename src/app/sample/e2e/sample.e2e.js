describe('test sample', function () {

  beforeEach(function() {
    browser.get('#/home');
  });

  it('should test the UI somehow', function () {
   expect(browser.getTitle()).toEqual('AngularJS Foundation Boilerplate');
  });
});
