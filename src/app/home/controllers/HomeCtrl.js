angular.module('home.controllers.HomeCtrl', [])
  .controller('HomeCtrl', function($scope, HomeService) {
    $scope.title = 'Home Page';
    $scope.homepageMessage = HomeService.getHelloMessage();
    $scope.foundationItems = HomeService.foundationItems;
  });
