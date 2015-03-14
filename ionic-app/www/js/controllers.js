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
	['$scope', 'USER', 'ANOTHER_USER', 'SOCKET_URL', '$state', '$ionicLoading', 
    function($scope, USER, ANOTHER_USER, SOCKET_URL, $state, $ionicLoading){
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

    socket.emit('join', USER.name);

    $scope.nextAuction = function(btn) {
        result += countResult(btn, index);
        if (index === ($scope.auctions.length - 1)) {
            $ionicLoading.show({
                template: 'Counting results...'
            })
            socket.on('finish', function (data) {
                if (data.matched) {
                    ANOTHER_USER.name = data.name;
                }
                $ionicLoading.hide();
                socket.disconnect();
                $state.go('match');
            })
            socket.emit('results', result);
            return;
        }
        $scope.auction = $scope.auctions[++index];
    }

    var countResult = function(btn, index) {
        var yes = (btn === 'YES') ? 1 : 0;
        return Math.pow(2, index) * yes;
    }
    
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
