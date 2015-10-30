describe('test home page', function () {

  beforeEach(function() {
    browser.get('#/home');
  });

  it('should display the dropdown button', function () {
   expect(browser.getTitle()).toEqual('AngularJS Foundation Boilerplate');
  });
});
