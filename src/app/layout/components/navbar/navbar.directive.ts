export function NavbarDirective() : angular.IDirective {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/layout/components/navbar/navbar.html',
    controller: NavbarController,
    controllerAs: 'vm',
    bindToController: true
  };
};

/** @ngInject */
export function NavbarController($scope, $state, sessionService, authentication, $filter, toastr) {
  var vm = this;
  vm.tab = 0;

  (function onload() {
    if (sessionService.isAuthenticated()){
      $scope.username = sessionService.getUsername();
    } else {
      console.log("ERORR, se espera un usuario auternticado");
    }
  }());

  vm.isSelected = function(panel){
    return (vm.tab === panel);
  }

  vm.selectTab = function(navBarItem){
    $scope.$emit('UPDATE_SIDEBAR', navBarItem);
  }

  $scope.cerrarSesion = function () {
      sessionService.cerrarSesion();
      $state.go("login");
  };
}
