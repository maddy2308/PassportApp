(function() {
    angular.module("PassportApp").factory("LoginService", LoginService);

    LoginService.$inject = ['$http'];

    function LoginService($http) {

        return {
            login : login
        };

        function login(user) {
            return $http.post("/login", user).then(successHandler).catch(errorHandler);
        }

        function successHandler(response) {
            return response.data
        }

        function errorHandler (error) {
            throw new Error(error.data);
        }
    }


})();
