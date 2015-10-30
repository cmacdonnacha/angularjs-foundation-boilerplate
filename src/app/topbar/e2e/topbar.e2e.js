describe('test topbar', function () {

  beforeEach(function() {
    browser.get('#/home');
  });

  it('should display the dropdown button', function () {
    expect(element(by.id('dropdownButton')).isDisplayed()).toBeTruthy();
  });

  it('should click on the dropdown button and show the dropdown menu', function () {
    element(by.id('dropdownButton')).click();
    expect(element(by.id('dropdownMenu')).isDisplayed()).toBeTruthy();
  });
});
