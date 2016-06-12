(function () {
    angular
        .module("PassportApp", ["ngRoute"])
        .config(function($routeProvider) {
            $routeProvider
                .when('/home', {
                    templateUrl: 'views/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'homeCtrl'
                })
                .when('/profile', {
                    templateUrl: 'views/profile/profile.html'
                })
                .when('/login', {
                    templateUrl: 'views/login/login.html',
                    controller: 'LoginController',
                    controllerAs: 'loginCtrl'
                })
                .when('/logout', {
                    templateUrl: 'views/logout.html'
                })
        });
})();
