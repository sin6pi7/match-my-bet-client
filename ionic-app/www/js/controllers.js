angular.module('starter.controllers',[])
.controller('HomeController',
	['$scope', 'USER', '$state',function($scope, USER, $state){
    $scope.user = {};
    $scope.start = function(){
        USER.name = $scope.user.name;
        $state.go('judge');
    }
}])
.controller('JudgeController',
	['$scope', 'USER', 'SOCKET_URL', '$state',function($scope, USER, SOCKET_URL, $state){
    var socket = io(SOCKET_URL);
    $scope.auctions = null;

    socket.on('paired', function (data) {
    	if (data.auctions.length > 0) {
            $scope.$apply(function() {
                $scope.auctions = data.auctions;
            });
        } 
    });

    $scope.doMatch = function() {
        console.log('dsd');
        $state.go('match'); // temporary
    };

    socket.emit('join', USER.name);
}])
.controller('MatchController',
    ['$scope', 'USER', 'ANOTHER_USER', '$state', function($scope, USER, ANOTHER_USER, $state) {
        $scope.anotherUser = ANOTHER_USER;


        $scope.doSomething = function() {

        };
        $scope.tryAgain = function() {
            $state.go('home');
        };
    }]);