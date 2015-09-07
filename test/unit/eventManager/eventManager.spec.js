describe("eventManagerHostedController", function() {
  beforeEach(module('app', 'app.eventManager'));

  var eventManagerHostedController;

  beforeEach(inject(function ($controller) {
    eventManagerHostedController = $controller('eventManagerHostedController', {
      'getHostedEventsPrep': {
        data: [{event1: 'hiking'}, {event2: 'swimming'}, {event3: 'eating'}]
      },
      'usersService': {}
    });
  }));
  
  it('should have have a confirmUser function', function () {
    expect(typeof eventManagerHostedController.confirmUser).toEqual('function');
  });

  it('should provide a list of events hosted by user', function() {
    expect(eventManagerHostedController.eventData.length).toBe(3);
  })

});


describe("eventManagerJoinedController", function() {
  beforeEach(module('app', 'app.eventManager'));

  var eventManagerJoinedController;

  beforeEach(inject(function ($controller) {
    eventManagerJoinedController = $controller('eventManagerJoinedController', {
      'getJoinedEventsPrep': {
        data: {
          username: 'kevin'
        }
      },
      'usersService': {}
    });
  }));

  it('should have have a eventData function', function () {
    expect(eventManagerJoinedController.eventData).toBeDefined();
  });

});
