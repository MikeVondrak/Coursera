(function () {  // IIFE to avoid global scope definitions
  'use strict';  // strict mode for js execution, no undeclared vars etc

  // test if string is blank
  String.prototype.isEmpty = function() {
    return !(this.trim());
  };

  angular.module('LunchChecker', [])
          .controller('LunchCheckerController', LunchCheckerController);

  LunchCheckerController.$inject = ['$scope'];  // define the names of expected parameters to avoid problems when minified
  function LunchCheckerController($scope) {     // $scope makes data available to the view
    $scope.LunchInput = "";       // model for input value
    $scope.InputValidState = 0;   // 0 = no input, 1 = invalid, 2 = valid, for input and message class
    $scope.LunchCheckerResultMessage = "";
    $scope.CheckLunch = function () {
      var input = $scope.LunchInput;

      // check for no data entered
      if(input.isEmpty())
      {
        $scope.LunchCheckerResultMessage = "Please enter data first";
        $scope.InputValidState = 1;
        return;
      }

      // count items
      var lunchItems = input.split(',');

      // filter out empty items
      var filteredItems = $.grep(lunchItems, function(item) { return !item.isEmpty() });

      if(filteredItems.length <= 0)
      {
        $scope.LunchCheckerResultMessage = "No non-empty items found";
        $scope.InputValidState = 1;
        return;
      }
      if (filteredItems.length > 3)
      {
        $scope.LunchCheckerResultMessage = "Too much!";
        $scope.InputValidState = 2;
      }
      else {
        $scope.LunchCheckerResultMessage = "Enjoy!";
        $scope.InputValidState = 2;
      }
    }; // end CheckLunch

  }; // end LunchCheckerController

})(); // end IIFE
