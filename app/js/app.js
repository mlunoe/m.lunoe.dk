(function () {
   "use strict";


  // Declare app level module which depends on filters, and services
  angular.module('m.lunoe', ['m.lunoe.filters', 'm.lunoe.services', 'm.lunoe.directives', 'ui.bootstrap']).
    config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: HomeCtrl});
      $routeProvider.otherwise({redirectTo: '/'});
    }]);
}());
