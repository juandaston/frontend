import {IIngresarPaciente} from "./IIngresarPaciente";

export function RootPacienteDirective(): angular.IDirective {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/paciente/componentes/root_paciente/rootPaciente.html',
        controller: RootPacienteController,
        controllerAs: 'vm',
        bindToController: true
    };
};

/** @ngInject */
export function RootPacienteController($scope, $filter, $uibModal, toastr, pacienteService) {
    var vm = this;

}