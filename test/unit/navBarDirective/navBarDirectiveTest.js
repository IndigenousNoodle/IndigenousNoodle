describe("directive: navBarDirective", function() {
  beforeEach(module('app', 'app.navbar'));

  var navController;

  beforeEach(inject(function ($controller){
    navController = $controller('navController');
  }));


  it('should check that the user is signed in', function(){
    navController.checkAuth(); // check authentication on page load
    expect(navController.signinoutMessage).toEqual('Sign In');
  });

  beforeEach(inject(function ($state){
    spyOn($state, 'go');
  }));

  it('should redirect the user when they click the sign in or sign out button', inject(function($state){
    navController.checkAuth();
    navController.signinout(); // sign in

    expect($state.go).toHaveBeenCalledWith('signin');
  }));
});