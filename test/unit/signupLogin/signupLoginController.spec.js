describe('signupLoginController', function() {
  beforeEach(angular.mock.module('app', 'app.signupLogin', 'app.dataservice'));

  var $signupLoginController

  beforeEach(inject(function ($controller) {
    signupLoginController = $controller('signupLoginController');
  }));

  it('should have a sign in function', function() {
    expect(signupLoginController.signin).toBeDefined();
  });

  it('should have a sign up function', function() {
    expect(signupLoginController.signup).toBeDefined();
  });

  it('should have a sign out function', function() {
    expect(signupLoginController.signout).toBeDefined();
  });

});
