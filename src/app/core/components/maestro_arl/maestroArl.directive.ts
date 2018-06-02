export function MaestroArlDirective(): angular.IDirective {
  return {
    restrict: 'E',
    scope: {
      model: '=',
      form: '=',
      name: '@'
    },
    templateUrl: 'app/core/components/maestro_arl/maestroArl.html',
    controller: MaestroArlController,
    controllerAs: 'vm',
    bindToController: true
  };
};

/** @ngInject */
export function MaestroArlController($scope, $attrs, cachesService, toastr) {
  var vm = this;
  vm.model = '';

  vm.getListaARL = function(val) {
    if (val.length >= 3) {
      var params = { "nombre": val };
      return cachesService.getListaFiltroARL(params).then(function(response) {
        switch (response.status) {
          case 200:
            return response.data;
          break;
          default:
            toastr.error("Ocurrió un error al obtener lista filtro ARL.");
            console.log("response status:" + response.status);
          break;
        }
      }, function(reason) {
        toastr.error("Ocurrió un error al obtener lista filtro ARL.");
        console.log("error " + reason);
      });
    }
  }
  
  //asigno el attributo required desde el uso de la directiva.
  $attrs.$observe('required', function(value) {
    vm.required = value;
  });
}
