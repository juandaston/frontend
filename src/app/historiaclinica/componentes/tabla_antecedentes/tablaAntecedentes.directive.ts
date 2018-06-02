import {IPaginacion} from "../../../core/models/IPaginacion";

export function TablaAntedentesDirective(): angular.IDirective {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/historiaclinica/componentes/tabla_antecedentes/tablaAntecedentes.html',
        controller: TablaAntedentesController,
        controllerAs: 'vm',
        bindToController: true
    };
};

/** @ngInject */
export function TablaAntedentesController($scope, $uibModal, toastr, antecedentesService) {
    var vm = this;
    vm.totalItems = 0;
    vm.currentPage = 1;
    vm.itemsPerPage = 10;
    vm.filtroAfiliado = {};
    vm.listaAntecedentes = [];

    $scope.$on('UPDATE_TABLA_ANTECEDENTES', function(event, data) {
        var params = {'idPaciente': data}

        antecedentesService.getAntecedentesPorIdPaciente(params).then(function(response) {
            switch (response.status) {
                case 200:
                    var map = response.data;
                    if(map == null){
                        toastr.info("No existen antedentes para la cedula");
                    }else{
                        console.log('Consulta antecedentes: ', map);
                        vm.listaAntecedentes = map;
                    }
                    break;
                default:
                    toastr.error("Ocurrió un error obteniendo los antecedentes");
                    break;
            }
        }, function(reason) {
            toastr.error("Ocurrió un error obteniendo los antedecedntes");
        });
    });
}
