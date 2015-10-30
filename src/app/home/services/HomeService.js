
angular.module('home.services.HomeService', [])
  .factory('HomeService', function() {

    var foundationItems = [
      {
        title:  'CheatSheet',
        link:   'http://sudheerdev.github.io/Foundation5CheatSheet/'
      },
      {
        title:  'Kitchen Sink',
        link:   'http://foundation.zurb.com/docs/components/kitchen_sink.html'
      },
      {
        title:  'Foundation Documentation',
        link:   'http://foundation.zurb.com/docs/'
      }
    ];

    var HomeService = {
      getHelloMessage: getHelloMessage,
      foundationItems: foundationItems
    };
    return HomeService;

    function getHelloMessage() {
      return 'Ready to get started? Great! Below are some resources to help you out.';
    }
  });
