export function GeorgeBooleDirective(): angular.IDirective {
  return {
    restrict: 'E',
    scope: {
      model: '=',
      name: "@"
    },
    templateUrl: 'app/core/components/george_boole/georgeBoole.html',
    controller: GeorgeBooleController,
    controllerAs: 'vm',
    bindToController: true
  };
};

/** @ngInject */
export function GeorgeBooleController($element, $scope, $timeout) {
  var vm = this;

  if (angular.isUndefined(vm.model) ) {
      vm.model = false;  
  }

  var element = $element.find(".bootstrap-switch");
  element.bootstrapSwitch();
  element.on('switchChange.bootstrapSwitch', function(event, state) {
    // This $timeout trick is necessary to run the Angular digest cycle
    $timeout(function() {
      vm.model = state;
    });
  });

}
