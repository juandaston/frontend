export interface IMyDirectiveScope extends angular.IScope {
  advanceForm: any;
}

export function AdvanceValidationsDirective(): angular.IDirective {
  return {
    restrict: 'AE',
    scope: {
      name: '@'
    },
    controller: AdvanceValidationsController,
    controllerAs: 'vm',
    bindToController: true,
    require:"^form", //inject parent form as the forth parameter to the link function
    link:function ($scope: IMyDirectiveScope, element, attrs, form){
      $scope.advanceForm = form; //save parent form
    }
  };
};

/** @ngInject */
export function AdvanceValidationsController($timeout, $scope, $element, $compile, $templateRequest, toastr) {
  var vm = this;
  $scope.name = vm.name;

/*  $timeout(function() {
    console.log('form to validate', $scope.advanceForm);
  },3000);*/

  $templateRequest('app/core/components/advance_validations/advanceValidations.html').then(function(html) {
    // Convert the html to an actual DOM node
    var template = angular.element(html);
    // Append it to the directive element
    $element.after(template);
    // And let Angular $compile it
    $compile(template)($scope);
  }, function(reason) {
    toastr.error("Ocurrió un error al obtener validaciones.");
    console.log("error " + reason);
  });
}
