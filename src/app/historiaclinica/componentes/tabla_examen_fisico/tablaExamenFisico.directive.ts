import {IPaginacion} from "../../../core/models/IPaginacion";

export function TablaExamenFisioDirective(): angular.IDirective {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/historiaclinica/componentes/tabla_examen_fisico/tablaExamenFisico.html',
        controller: TablaExamenFisioController,
        controllerAs: 'vm',
        bindToController: true
    };
};

/** @ngInject */
export function TablaExamenFisioController($scope, $uibModal, pacienteService, toastr) {
    var vm = this;
    vm.totalItems = 0;
    vm.currentPage = 1;
    vm.itemsPerPage = 10;
    vm.filtroAfiliado = {};

    vm.listaExamenFisico = [{
        presionArterial:'Hola',
        fc:'hola',
        fr:'hgdsgdgfhd',
        peso:'adsfasdfas',
        talla:'sadfasd',
        perimetroAbdominal:'Hola',
        cabeza:'hola',
        cuello:'hgdsgdgfhd',
        torax:'adsfasdfas',
        abdomen:'sadfasd',
        extremidades:'sadfasd',
        neurologico:'hola',
        osteomuscular:'hgdsgdgfhd',
        mental:'adsfasdfas'
    }];
}
