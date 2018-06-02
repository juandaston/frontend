import {Municipio} from "./maestroMunicipio.model";

export function MaestroMunicipioDirective(): angular.IDirective {
  return {
    restrict: 'E',
    scope: {
      form: '=model',
      name: '@'
    },
    templateUrl: 'app/core/components/maestro_municipio/maestroMunicipio.html',
    controller: MaestroMunicipioController
  };
};

/** @ngInject */
export function MaestroMunicipioController($scope, $attrs, cachesService, toastr) {
  var form:Municipio = {
    id: "",
    nombre: ""
  };
  angular.extend($scope, {form:form});

  $scope.getListaMunicipios = function(val) {
    if (val.length >= 3) {
      var params = { "nombre": val };
      return cachesService.getListaFiltroMunicipio(params).then(function(response) {
        switch (response.status) {
          case 200:
            return response.data;
            break;
          default:
            toastr.error("Ocurrió un error al obtener filtro Municipio.");
            console.log("response status:" + response.status);
            break;
        }
      }, function(reason) {
        toastr.error("Ocurrió un error al obtener filtro Municipio.");
      });
    }
  }

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
