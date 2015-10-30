angular.module('sample.services.SampleService', [])
  .factory('SampleService', function() {

    var SampleService = {
      getMessage: getMessage,
      addNumbers: addNumbers
    };
    return SampleService;

    function getMessage() {
      return 'Hello, this is a sample service!';
    }

    function addNumbers(num1, num2) {
      return num1 + num2;
    }
  });
