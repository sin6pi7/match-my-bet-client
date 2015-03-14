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
	['$scope', 'USER', 'SOCKET_URL', '$state', '$ionicLoading', function($scope, USER, SOCKET_URL, $state, $ionicLoading){
    var socket = io(SOCKET_URL),
        index = 0,
        result = 0;

    $ionicLoading.show({
        template: 'Loading...'
    });

    $scope.auction = {
        title: '',
        image: ''
    };

    socket.on('paired', function (data) {
    	if (data.auctions.length > 0) {
            $scope.$apply(function() {
                $scope.auctions = data.auctions;
                $scope.auction = $scope.auctions[index];
            });
            $ionicLoading.hide();
        }
    });

    $scope.nextAuction = function(btn) {
        result += countResult(btn, index);
        if (index === ($scope.auctions.length - 1)) {
            socket.emit('results', result);
            socket.disconnect();
            return;
        }
        $scope.auction = $scope.auctions[++index];
    }

    var countResult = function(btn, index) {
        var yes = (btn === 'YES') ? 1 : 0;
        return Math.pow(2, index) * yes;
    }

    socket.emit('join', USER.name);
}]);