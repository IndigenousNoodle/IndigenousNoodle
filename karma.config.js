// Karma configuration
// Generated on Mon Jun 30 2014 19:35:20 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: ['./public/lib/socket.io-client/socket.io.js',
        './public/lib/jquery/dist/jquery.min.js',
        './public/lib/angular/angular.min.js',
        './public/lib/angular-simple-logger/dist/index.js',
        './public/lib/angular-mocks/angular-mocks.js',
        './public/lib/angular-aria/angular-aria.min.js',
        './public/lib/angular-animate/angular-animate.min.js',
        './public/lib/angular-material/angular-material.min.js',
        './public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
        './public/lib/angular-ui-router/release/angular-ui-router.min.js',
        './public/lib/lodash/lodash.min.js',
        './public/lib/gm.datepicker-multi-select/dist/gm.datepickerMultiSelect.min.js',
        './public/lib/angular-google-maps/dist/angular-google-maps.min.js',
        './public/signupLogin/signupLoginController.js',
        './public/factories/factories.js',
        './public/app.js',
        './public/services/data.service.js',
        './public/services/attachTokenService.js',
        './public/services/eventsService.js',
        './public/services/signupLoginService.js',
        './public/services/usersAndEventsService.js',
        './public/services/usersService.js',
        './public/services/reviewService.js',
        './public/services/googleMapService.js',
        './public/services/messagesService.js',
        './public/components/navBar/navBarDirective.js',
        './public/homepage/homepageController.js',
        './public/eventDetailPage/eventDetailController.js',
        './public/eventsDisplayPage/eventsDisplayController.js',
        './public/eventsDisplayPage/eventListController.js',
        './public/eventsDisplayPage/mapsController.js',
        './public/createEventPage/createEventController.js',
        './public/eventManager/eventManagerController.js',
        './public/profilePage/profilePageController.js',
        './public/eventManager/eventManagerJoinedController.js',
        './public/eventManager/eventManagerHostedController.js',
        './public/eventManager/eventReviewController.js',
        './public/userProfile/userProfileController.js',
        './public/messagePage/messageController.js',
        './public/messageListPage/messageListController.js',
        './test/unit/**/*.js',
        './test/mocks/**/*.js',
    ],


    // list of files to exclude
    exclude: [
        'karma.conf.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {

    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['nyan','unicorn'],


    plugin: ['karma-phantomjs-launcher'],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
