describe("eventDetailController", function() {
  beforeEach(module('app', 'app.eventDetail'));

  var eventDetailController;

  // actual data from a created event
  // will probably use on tests to eventsservice
  var eventData = {
                  data:
                    {address: null,
                    city: "chicago",
                    cost: null,
                    createdAt: "2015-09-05T23:51:59.565Z",
                    description: "Come through today",
                    hostId: 20,
                    id: 19,
                    photoUrl: null,
                    state: null,
                    time: "2015-12-21T04:10:00.000Z",
                    title: "Bar hopping",
                    updatedAt: "2015-09-05T23:51:59.565Z",
                    zipcode: null }
                  };

  beforeEach(inject(function ($controller){
    eventDetailController = $controller('eventDetailController', {
      'getEvent': eventData
    });
  }));

  // to properly test we need to stub data (not for client side unit tests)
  it('should have a join method', function(){
    expect(eventDetailController.join).toBeDefined();
  });

});