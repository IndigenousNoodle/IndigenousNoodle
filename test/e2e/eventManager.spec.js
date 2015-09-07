describe('Website signin', function() {
  beforeEach(function() {
    browser.get('/#/events/eventManager');
    browser.executeScript('localStorage.setItem("localHosts","eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NywidXNlcm5hbWUiOiJhYmMiLCJwYXNzd29yZCI6IiQyYSQxMCRrUnpRR3VUWER1TC9QSzlXQ25CTEkucnBaampERy9yRVFCTkxhbm5UNkU0alNCczlOb25LeSIsInBob3RvVXJsIjpudWxsLCJjcmVhdGVkQXQiOiIyMDE1LTA5LTA3VDE4OjQ3OjU0LjY4MFoiLCJ1cGRhdGVkQXQiOiIyMDE1LTA5LTA3VDE4OjQ3OjU0LjY4MFoifQ.oezUqLc7WPxloxLUGU1MSoDmC4H2ICI2aV1hj2ySgEM");');
  });

  it('should take the host to the joined users profile page', function() {
    element(by.linkText('Hosted Events')).click();
    element(by.binding('user.username')).click();

    expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/user/userProfile/qwer');

  });
});