// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services' ])

.run(function($ionicPlatform, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    $state.go('home');
  });
  $state.go('home');
})

.config(['$stateProvider', function($stateProvider){
        openFB.init({appId: '1520583268164264'});
        $stateProvider.state('home',{
            url:'/home',
            controller:'HomeController',
            templateUrl:'views/home.html'
        }).state('judge',{
            url:'/judge',
            controller:'JudgeController',
            templateUrl:'views/judge.html'
        }).state('match', {
            url: '/match',
            controller: 'MatchController',
            templateUrl: 'views/match.html'
        });
}]);
