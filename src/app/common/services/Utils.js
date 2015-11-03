angular.module('common.services.Utils', [])
  .factory('Utils', function Utils() {

    var utils = {
      isNullOrUndefined: isNullOrUndefined,
      isUndefinedOrWhitespace: isUndefinedOrWhitespace,
      isNullOrWhitespace: isNullOrWhitespace,
      isNullOrUndefinedOrWhitespace: isNullorUndefinedOrWhitespace
    };
    return utils;

    function isNullOrUndefined(object) {
      return object === null || angular.isUndefined(object) ? true : false;
    }

    function isUndefinedOrWhitespace(stringText) {
      return angular.isUndefined(stringText) || stringText.trim().length <= 0 ? true : false;
    }

    function isNullorUndefinedOrWhitespace(stringText) {
      if(stringText !== null) {
        return angular.isUndefined(stringText) || stringText.trim().length <= 0 ? true : false;
      } else {
        return true;
      }
    }

    function isNullOrWhitespace(stringText) {
      return stringText === null || stringText.trim().length <= 0 ? true : false;
    }
  });
