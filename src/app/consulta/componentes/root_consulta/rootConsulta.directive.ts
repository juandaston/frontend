import {IFinalizarConsulta} from "./IFinalizarConsulta";
import {IPaciente} from "../root_consulta/model/IPaciente";

export function RootConsultaDirective(): angular.IDirective {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/consulta/componentes/root_consulta/rootConsulta.html',
        controller: RootConsultaController,
        controllerAs: 'vm',
        bindToController: true
    };
};

/** @ngInject */
export function RootConsultaController($scope, $uibModal, pacienteService, toastr, consultaServices, $state) {
    var vm = this;
    vm.visible = false;
    vm.cargando = false;
    vm.finalizarConsulta = <IFinalizarConsulta>{};
    vm.paciente = <IPaciente>{};

    vm.consultarPacientePorId = function() {
        vm.cargando = true;
        var params = {
            'tipoIdentificacion': vm.datosPaciente.tipoIdentificacion,
            'numeroIdentificacion': vm.datosPaciente.numeroIdentificacion
        }

        console.log('Parametros: ', params);
        pacienteService.getListarPacientePorId(params).then(function(response) {
            switch (response.status) {
                case 200:
                    var map = response.data;
                    if(map == null){
                        toastr.info("No existe un paciente registrado con la cedula ingresada");
                        vm.cargando = false;
                        vm.visible = false;
                    }else{
                        console.log('Consulta paciente: ', map);
                        vm.paciente = map;
                        vm.cargando = false;
                        vm.visible = true;
                    }
                    break;
                default:
                    toastr.error("Ocurrió un error obteniendo los datos de paciente");
                    vm.visible = false;
                    break;
            }
        }, function(reason) {
            vm.cargando = false;
            toastr.error("Ocurrió un error obteniendo los datos del paciente");
            vm.visible = false;
        });
    }

    vm.finalizarConsultaComando = function() {
        vm.finalizarConsulta.comando = 'FinalizarConsulta';
        vm.finalizarConsulta.idPaciente = vm.paciente.idPaciente;

        consultaServices.executeCommand(vm.finalizarConsulta).then(function(response) {
            console.log("Comando de finalizar: ", vm.finalizarConsulta);
            switch (response.status) {
                case 200:
                    toastr.success("Se ha finalizado la consulta correctamente");
                    $state.go($state.current, {"tipoIdentificacion" : null, "nroIdentificacion" : null }, {reload: true});
                    vm.visible = false;
                    break;
                default:
                    toastr.error("Ha ocurrido finalizando la consulta");
                    break;
            }
        }, function(reason) {
            toastr.error("Ha ocurrido un error finalizando la consulta");
            console.log('error', reason);
        });
    }
}