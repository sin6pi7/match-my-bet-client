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

    socket.emit('join', USER.name);
}]);