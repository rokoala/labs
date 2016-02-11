angular
  .module('app', [])
  .run(['$rootScope', '$window',
    function($rootScope, $window) {

      $rootScope.user = {};

      $window.fbAsyncInit = function() {
        // Executed when the SDK is loaded

        FB.init({

          /*
           The app id of the web app;
           To register a new app visit Facebook App Dashboard
           ( https://developers.facebook.com/apps/ )
          */

          appId: '1014745621896949',


          /*
           Set if you want to check the authentication status
           at the start up of the app
          */

          status: true,

          /*
           Enable cookies to allow the server to access
           the session
          */

          cookie: true,

          /* Parse XFBML */

          xfbml: true,
          version: 'v2.5'
        });

      }
    }
  ])

.factory('facebookService', function($q) {
  return {
    getMyLastName: function() {
      var deferred = $q.defer();
      FB.api('/me', {
        fields: 'last_name'
      }, function(response) {
        if (!response || response.error) {
          deferred.reject('Error occured');
        } else {
          deferred.resolve(response);
        }
      });
      return deferred.promise;
    }
  }
})

.controller("MainController", MainController);

MainController.$inject = ["$scope", "facebookService"];

function MainController($scope, facebookService) {
  $scope.hello = "Hello world";

  $scope.getMyLastName = function() {
    facebookService.getMyLastName()
      .then(function(response) {
        $scope.last_name = response.last_name;
      });
  };

}
