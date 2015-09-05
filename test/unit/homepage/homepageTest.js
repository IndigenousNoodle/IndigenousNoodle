describe("homepageController", function() {
  beforeEach(module('app', 'homepage'));

  var homepageController;

  beforeEach(inject(function ($controller) {
    homepageController = $controller('homepageController', {});
  }));
  
  beforeEach(inject(function ($state) {
    spyOn($state, 'go');
  }));

  it('should have displayEvents function', function () {
    expect(homepageController.displayEvents).toBeDefined();
  });

  it('should move to the eventList page after searching the location', inject(function($state) {
    homepageController.findCity = 'seoul';
    homepageController.displayEvents();

    expect($state.go).toHaveBeenCalledWith('eventList', {city: homepageController.findCity});
  })); 

});