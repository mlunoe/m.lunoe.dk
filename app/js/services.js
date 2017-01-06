(function () {
   "use strict";

  /* Services */
  angular.module('m.lunoe.services', [])

    .factory('GitHubService', ['$http', function($http) {
      var Response = {
        data: {},
        get: function() {
          var config = {params: {callback: "JSON_CALLBACK"}};

          return $http.jsonp('https://api.github.com/users/mlunoe/events', config)
            .success(function(result) {
              Response.data = result.data;
            })
            .error(function(data, status, headers) {
              Response.data = status;
            });
        }
      };

      return Response;
    }])

    .factory('StackOverflowService', ['$http', function($http) {
      var Response = {
        data: {},
        get: function() {
        var config = {params: {callback: "JSON_CALLBACK"}};

        return $http.jsonp('https://api.stackexchange.com/2.2/users?order=desc&sort=name&inname=mlunoe&site=stackoverflow', config)
          .success(function(result) {
            Response.data = result.data;
          })
          .error(function(data, status, headers) {
            Response.data = status;
          });
        }
      };

      return Response;
    }])

    .factory('socket', function ($rootScope) {
      // var socket = io.connect('http://localhost:8000');
      var socket = io.connect('http://m.lunoe.dk:8000');

      return {
        on: function (eventName, callback) {
          socket.on(eventName, function () {
            var args = arguments;
            $rootScope.$apply(function () {
              callback.apply(socket, args);
            });
          });
        },
        emit: function (eventName, data, callback) {
          socket.emit(eventName, data, function () {
            var args = arguments;
            $rootScope.$apply(function () {
              if (callback) {
                callback.apply(socket, args);
              }
            });
          });
        }
      };
    });
}());
