describe('test home page', function () {

  beforeEach(function() {
    browser.get('#/home');
  });

  it('should ensure the page title is correct', function () {
   expect(browser.getTitle()).toEqual('AngularJS Foundation Boilerplate');
  });
});
