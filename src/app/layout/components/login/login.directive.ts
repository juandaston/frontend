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
    controllerAs: 'crtl',
    bindToController: true
  };
};

/** @ngInject */
export function LoginController($scope, $base64, $state, toastr, authentication, sessionService) {
  var form = <LoginForm>{};
  angular.extend($scope, { form: form });

  $scope.login = function () {
    if($scope.advanceForm.$valid){
      var menu = ''
        var location = 'layout.concepto'
        var username = form.username;
        var advanceToken  = $base64.encode(form.username+":"+form.password);
        sessionService.crearSesion( username, advanceToken, menu, location);

      authentication.login( form.username, form.password).then(function (response) {
        switch(response.status){
          case 200:
            var username = form.username;
            var advanceToken  = $base64.encode(form.username+":"+form.password);
            sessionService.crearSesion( username, advanceToken, response.data["menu"], response.data["ubicaciones"]);
            var numSesionesAbiertas = response.data["sesiones-abiertas"];
            if(numSesionesAbiertas != '1'){
              toastr.info("Usted tiene " + numSesionesAbiertas + " sesiones abiertas simultáneamente.");
            }
            $state.go('layout');
            break;
          default:
            toastr.error("Error en la autenticacion");
        }
      }, function (reason) {
        switch(reason.status) {
          case 401:
            toastr.info("Usuario/Password Incorrectos");
            break;
          default:
            toastr.error("Error en la autenticacion");
        }
      });
    }
  }
}
