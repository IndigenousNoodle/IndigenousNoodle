describe("createEventController", function() {
  beforeEach(module('app', 'app.createEvent'));

  var createEventController;

  beforeEach(inject(function ($controller){
    createEventController = $controller('createEventController', {
      "title": "Testing Code",
      "city": "San Francisco",
      "time": "2015-12-21T05:10:00.000Z",
      "description": "We will be extensively testing code"
    });
  }));

  it('should have a submit function', function(){
    expect(createEventController.submit).toBeDefined();
  });

  beforeEach(inject(function ($state){
    spyOn($state, "go");
  }));

  // data service would need to be tested for the post event to work properly
  // it('should move to a new page after a successful submit', inject(function($state){
  //   createEventController.submit(true);
  //   console.log("createEVENTController === ", createEventController);
  //   console.log("createEventController.title === ", createEventController.title);
  // }));
});
