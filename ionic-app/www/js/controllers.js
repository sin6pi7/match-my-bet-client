angular.module('starter.controllers',[])
.controller('HomeController',
	['$scope', 'USER', '$state', function($scope, USER, $state){
    $scope.user = {};

    $scope.start = function() {
        USER.name = $scope.user.name;
        USER.image = "http://www.digibuzzme.com/wp-content/uploads/2012/11/error-404-road-not-found.jpg";
        $state.go('judge');
        // openFB.login(
        //     function(response) {
        //         if (response.status === 'connected') {
        //             console.log('Facebook login succeeded');

        //                 openFB.api({
        //                     path: '/me',
        //                     params: {fields: 'id,name'},
        //                     success: function(user) {
        //                         $scope.$apply(function() {
        //                             $scope.user = user;
        //                             USER = $scope.user;
        //                             USER.image = 'http://graph.facebook.com/' + USER.id + '/picture?width=270&height=270';
        //                             console.log(USER);
        //                             $state.go('judge');
        //                         });
        //                     },
        //                     error: function(error) {
        //                         $state.go('home');
        //                     }
        //                 });
        //         } else {
        //             $state.go('home');
        //         }
        //     },
        //     {scope: 'email,publish_actions'});
    };
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

    socket.emit('join', USER);

    $scope.nextAuction = function(btn) {
        result += countResult(btn, index);
        if (index === ($scope.auctions.length - 1)) {
            $ionicLoading.show({
                template: 'Counting results...'
            });
            socket.on('finish', function (data) {
                if (data.matched) {
                    ANOTHER_USER.name = data.username;
                    ANOTHER_USER.image = data.image;
                }
                $ionicLoading.hide();
                socket.disconnect();
                $state.go('match');
            });
            socket.emit('results', result);
            return;
        }
        $scope.auction = $scope.auctions[++index];
    };

    var countResult = function(btn, index) {
        var yes = (btn === 'YES') ? 1 : 0;
        return Math.pow(2, index) * yes;
    }
}])
.controller('MatchController',
    ['$scope', 'ANOTHER_USER', '$state', function($scope, ANOTHER_USER, $state) {
        $scope.anotherUser = {
            name: ANOTHER_USER.name,
            image: ANOTHER_USER.image
        }
    }]);
