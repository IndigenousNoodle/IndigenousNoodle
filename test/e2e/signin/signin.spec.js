 describe('Website signin', function() {
    beforeEach(function() {
            browser.get('/#/signin');
    });
    it('verify that the user is logged in', function() {
        browser.driver.manage().deleteAllCookies();
        element(by.model('user.username')).sendKeys('inginalda');
        element(by.model('user.password')).sendKeys('1234');
        element(by.css('input[type="submit"]')).click();
        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return (/#/).test(url);
            });
        });
  expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/');
    });
});