angular.module('topbar.controllers.TopbarCtrl', [])
  .controller('TopbarCtrl', function($state, $scope) {

    // Go to the 'about' state which shows the about page content.
    $scope.showAboutPage = function(){
      $state.go('about');
    };
  });
