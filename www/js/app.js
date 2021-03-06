// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'app.services' is found in services.js
// 'app.controllers' is found in controllers.js
angular.module('app', ['ionic', 'ngResource', 'ngMessages', 'ngCookies', 'validation.match', 'app.config', 'app.controllers', 'app.services', 'app.directives', 'angularMoment'])

.run(function($ionicPlatform, amMoment, Users, $ionicHistory, $rootScope, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    Users.current()
        .then(function(user){

        })
        .catch(function(data){
          $state.go('app.account');
        });
  });


})
.constant('moment', moment)
.constant('angularMomentConfig', {
  preprocess: 'unix', // optional
  timezone: 'Europe/Madrid' // optional
})
.config(function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $stateProvider

  // setup an abstract state for the tabs directive
  .state('app', {
    url: "",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('app.map', {
    url: '/map',
    views: {
      'tab-map': {
        templateUrl: 'templates/tab-map.html',
        controller: 'MapCtrl'
      }
    }
  })

  .state('app.home', {
    url: '/home',
    resolve: {
      happinessRange: function(){
        return [1, 2, 3, 4, 5];
      }
    },
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-addHappiness.html',
        controller: 'HomeCtrl'
      }
    },
    cache: false
  })

  .state('app.trending', {
    url: '/trending',
    resolve: {
      happinessRange: function(){
        return [1, 2, 3, 4, 5];
      }
    },
    views: {
      'tab-trending': {
        templateUrl: 'templates/tab-trending.html',
        controller: 'TrendingCtrl'
      }
    }
  })
  .state('app.about', {
    url: '/about',
    views: {
      'tab-about': {
        templateUrl: 'templates/tab-about.html',
        controller: 'AboutCtrl'
      }
    }
  })
  .state('app.account', {
    url: '/account',
    resolve: {
      happinessRange: function(){
        return [1, 2, 3, 4, 5];
      }
    },
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});
