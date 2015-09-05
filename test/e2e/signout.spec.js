describe('Sign Out', function() {

  beforeEach(function() {
    browser.get('/#/signin');
    element(by.model('user.username')).sendKeys('lisa');
    element(by.model('user.password')).sendKeys('1234');
    element(by.css('input[type=submit]')).click();
    element(by.css('#dropdown')).click();
  })


  it('Nav abr button should display "Sign Out" after signed in', function() {
    element(by.binding('navController.signinoutMessage')).getText().then(function(text) {
      expect(text).toBe('Sign Out');
    });
  });

  it('should clear local storage', function() {
    element(by.binding('navController.signinoutMessage')).click();
    var token = browser.executeScript("return window.localStorage.getItem('localHosts');");
    expect(token).toEqual(undefined);
  });

  it('should take user to sign in page', function() {
    element(by.binding('navController.signinoutMessage')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/signin');
  });

  it('should protect event detail page', function() {
    element(by.binding('navController.signinoutMessage')).click();
    browser.get('/#/eventDetail/');
    expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/signin');
  });
});
