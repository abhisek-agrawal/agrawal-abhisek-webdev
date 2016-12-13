(function () {
    angular
        .module("LifeDrops")
        .factory("PeopleService", PeopleService);

    function PeopleService($http) {

        var api = {
            "register"              : register,
            "checkLogin"            : checkLogin,
            "login"                 : login,
            "logout"                : logout,
            "findUserById"          : findUserById,
            "updateUser"            : updateUser,
            "updateUserPassword"    : updateUserPassword,
            "findRecipientUsers"    : findRecipientUsers
        };
        return api;

        ////////////////////////////////////////////////////////////

        function register(user) {
            var url = "/project/api/register";
            return $http.post(url, user);
        }

        function checkLogin() {
            var url = "/project/api/loggedin";
            return $http.get(url);
        }

        function login(user) {
            var url = "/project/api/login";
            return $http.post(url, user);
        }

        function logout() {
            var url = "/project/api/logout";
            return $http.post(url);
        }

        function findUserById(id) {
            var url = "/project/api/user/" + id;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = "/project/api/user/" + userId;
            return $http.put(url, user);
        }

        function updateUserPassword(userId, user) {
            var url = "/project/api/userPassword/" + userId;
            return $http.put(url, user);
        }

        function findRecipientUsers() {
            var url = "/project/api/recipients";
            return $http.get(url);
        }

    }

})();