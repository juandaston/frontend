export function RootDirective(): angular.IDirective {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/layout/components/root/root.html',
    controller: RootController,
    controllerAs: 'vm',
    bindToController: true
  };
};

/** @ngInject */
export function RootController($scope, sessionService, utils, $timeout, toastr, $idle, authentication, $state, $window) {
  var vm = this;

  $scope.$on('UPDATE_SIDEBAR', function(event, data) {
    $scope.$broadcast('UPDATE_SIDEBAR_CHILD', data);
    sessionService.setCurrentTab(data);
  });

  vm.searchInSession = function() {
    if (!utils.isNull(sessionService.getCurrentTab())) {
      $scope.$broadcast('UPDATE_SIDEBAR_CHILD', sessionService.getCurrentTab());
    }
  }

  $scope.$on('$idleStart', function() {
      // the user appears to have gone idle
  });

  $scope.$on('$idleWarn', function(e, countdown) {
      // follows after the $idleStart event, but includes a countdown until the user is considered timed out
      // the countdown arg is the number of seconds remaining until then.
      // you can change the title or display a warning dialog from here.
      // you can let them resume their session by calling $idle.watch()

      //Solo mostrar un mensaje
      if(countdown==300){
        toastr.info("La sesión se cerrara en 5 minutos");
      }
  });

  $scope.$on('$idleTimeout', function() {
      // the user has timed out (meaning idleDuration + warningDuration has passed without any activity)
      // this is where you'd log them
      $scope.cerrarSesion();
  })

  $scope.$on('$idleEnd', function() {
      // the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
      toastr.info("La sesión se ha reactivado");
  });

  $scope.$on('$keepalive', function() {
  })

  $scope.cerrarSesion = function () {
      sessionService.cerrarSesion();
      $state.go("login");
  };
}
