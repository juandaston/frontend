export interface LoginForm {
  username: string;
  password: string;
}

export function LoginDirective(): angular.IDirective {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/layout/components/login/login.html',
    controller: LoginController,
    controllerAs: 'vm',
    bindToController: true
  };
};

/** @ngInject */
export function LoginController($scope, $base64, $state, toastr, authentication, sessionService) {
  var vm = this;
  vm.cargando = false;
  var form = <LoginForm>{};
  angular.extend($scope, { form: form });

  $scope.login = function () {
      vm.cargando = true;
    if($scope.consultorioForm.$valid){
        var username = form.username;
        var consultorioToken  = $base64.encode(form.username+":"+form.password);
        sessionService.crearSesion( username, consultorioToken);

      authentication.login( form.username, form.password).then(function (response) {
        switch(response.status){
          case 200:
            var username = form.username;
            var consultorioToken  = $base64.encode(form.username+":"+form.password);
            sessionService.crearSesion( username, consultorioToken);
            var numSesionesAbiertas = response.data["sesiones-abiertas"];
            if(numSesionesAbiertas != '1'){
              toastr.info("Usted tiene " + numSesionesAbiertas + " sesiones abiertas simultáneamente.");
            }
            vm.cargando = false;
            $state.go('layout');
            break;
          default:
            toastr.error("Error en la autenticacion");
            vm.cargando = false;
        }
      }, function (reason) {
        switch(reason.status) {
          case 401:
            toastr.info("Usuario/Password Incorrectos");
            vm.cargando = false;
            break;
          default:
            toastr.error("Error en la autenticacion");
            vm.cargando = false;
        }
      });
    }
  }
}
