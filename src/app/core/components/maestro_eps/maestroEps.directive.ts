import {Eps} from "./maestroEps.model";

export function MaestroEpsDirective(): angular.IDirective {
  return {
    restrict: 'E',
    scope: {
      form: '=model',
      name: '@'
    },
    templateUrl: 'app/core/components/maestro_eps/maestroEps.html',
    controller: MaestroEpsController
  };
};

/** @ngInject */
export function MaestroEpsController($scope, $attrs, cachesService, toastr) {
  var form:Eps = {
    nit: "",
    nombre: ""
  };
  angular.extend($scope, {form:form});

  $scope.getListaEPS = function(val) {
    if (val.length >= 3) {
      var params = { "nombre": val };
      return cachesService.getListaFiltroEPS(params).then(function(response) {
        switch (response.status) {
          case 200:
            return response.data;
            break;
          default:
            toastr.error("Ocurrió un error al obtener filtro EPS.");
            console.log("response status:" + response.status);
            break;
        }
      }, function(reason) {
         toastr.error("Ocurrió un error al obtener filtro EPS.");
      });
    }
  };

  $scope.validar = function() {
    if(angular.isObject($scope.form) === false){
      $scope.form = {
        id: "",
        nombre: ""
      };
    };
  };

  //asigno el attributo required desde el uso de la directiva.
  $attrs.$observe('required', function(value) {
    $scope.isRequired = true;
  });
}
