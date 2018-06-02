import {CodigoCIE10} from "./cie10.model";
export function CIE10Directive(): angular.IDirective {
  return {
    restrict: 'E',
    scope: {
      form: '=model'
    },
    templateUrl: 'app/core/components/maestro_cie10/cie10.html',
    controller: CIE10Controller
  };
};

/** @ngInject */
export function CIE10Controller($scope, assetsService, cachesService, toastr) {
  var form:CodigoCIE10 = {
    id: "",
    nombre: ""
  } ;
  angular.extend($scope, {form:form});

  $scope.getListaCodigosCIE10 = function(val) {
    if (val.length >= 3) {
      var params = { "codigo": val };
      return cachesService.getListaFiltroCIE10(params).then(function(response) {
        switch (response.status) {
          case 200:
            return response.data.map(function(obj) {
              var tmpObj = { id: "", nombre: "" };
              tmpObj.id = obj.codigo;
              tmpObj.nombre = obj.nombre;
              return tmpObj;
            });
            break;
          default:
            toastr.error("Ocurrió un error al obtener filtro CIE10.");
            console.log("response status:" + response.status);
            break;
        }
      }, function(reason) {
        toastr.error("Ocurrió un error al obtener filtro CIE10.");
      });
    }
  }

  $scope.getListaNombresCIE10 = function(val) {
    if (val.length >= 3) {
      var params = { "nombre": val };
      return cachesService.getListaFiltroCIE10(params).then(function(response) {
        switch (response.status) {
          case 200:
            return response.data.map(function(obj) {
              var tmpObj = { id: "", nombre: "" };
              tmpObj.id = obj.codigo;
              tmpObj.nombre = obj.nombre;
              return tmpObj;
            });
            break;
          default:
            toastr.error("Ocurrió un error al obtener filtro CIE10.");
            console.log("response status:" + response.status);
            break;
        }
      }, function(reason) {
        toastr.error("Ocurrió un error al obtener filtro CIE10.");
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

}
