export function DatepickerDirective(): angular.IDirective {
  return {
    restrict: 'E',
    scope: {
      model: '=',
      name: '@',
      minDate: '@',
      maxDate: '@',
      defaultDate: '@'
    },
    templateUrl: 'app/core/components/datepicker/datepicker.html',
    controller: DatepickerController,
    controllerAs: 'vm',
    bindToController: true
  };
};

/** @ngInject */
export function DatepickerController($attrs, $filter) {
  var vm = this;

  vm.status = {
    opened: false
  }

  vm.open = function($event) {
    vm.status.opened = true;
  }

  var load = function() {
    if(angular.isUndefined(vm.model)){
      vm.model = new Date();
    }
    if (angular.isDefined(vm.minDate)) {
      if (angular.equals(vm.minDate, "today")) {
        vm.minDate = $filter('date')(new Date(), "yyyy/MM/dd");
      } else {
        vm.minDate  = new Date(vm.minDate);
      }
      $attrs.minDate = vm.minDate;
    }
    if (angular.isDefined(vm.maxDate)) {
       if (angular.equals(vm.maxDate, "today")) {
        vm.maxDate = $filter('date')(new Date(), "yyyy/MM/dd");
      } else {
        vm.maxDate = new Date(vm.maxDate);
      }
      $attrs.maxDate = vm.maxDate;
    }
  }
  load();

  //asigno el attributo required desde el uso de la directiva.
  $attrs.$observe('disabled', function(value) {
    vm.disabled = value;
  });

  //asigno el attributo required desde el uso de la directiva.
  $attrs.$observe('required', function(value) {
    vm.required = value;
  });

}
