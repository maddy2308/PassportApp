(function() {
    angular.module("PassportApp").controller("LoginController", LoginController);

    LoginController.$inject = ['LoginService'];

    function LoginController(loginService) {
        var self = this;

        self.login = login;

        function login(user) {
            loginService.login(user).then(function(response) {
                swal("Success", "Login Successful", 'success')
            }).catch(function(error){
                swal("Error", "Login Failed " + error.data, 'error')
            });
        }
    }

})();