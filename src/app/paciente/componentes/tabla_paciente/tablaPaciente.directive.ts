import {IPaginacion} from "../../../core/models/IPaginacion";
import {IPaciente} from "../tabla_paciente/model/IPaciente";
import {IEditarPacienteCommand} from "../tabla_paciente/model/IEditarPacienteCommand";

export function TablaPacienteDirective(): angular.IDirective {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/paciente/componentes/tabla_paciente/tablaPaciente.html',
        controller: TablaPacienteController,
        controllerAs: 'vm',
        bindToController: true
    };
};

/** @ngInject */
export function TablaPacienteController($scope, $uibModal, pacienteService, toastr) {
    var vm = this;
    vm.totalItems = 0;
    vm.currentPage = 1;
    vm.itemsPerPage = 10;
    vm.filtroAfiliado = {};
    vm.cargando = false;

    vm.listaPacientes = [];

    vm.editarPacienteCommand = <IEditarPacienteCommand>{};

    vm.updateTablaPacientes = function() {
        vm.cargando = true;
        var params = {
            'init': vm.itemsPerPage * (vm.currentPage - 1),
            'limit': vm.itemsPerPage
        }

        pacienteService.getListarPacientes(params).then(function(response) {
            switch (response.status) {
                case 200:
                    var map = response.data;
                    var paginacion = <IPaginacion>map.paginacion;
                    vm.totalItems = map.length - 1;
                    vm.listaPacientes = map;
                    console.log("mi pagina es: ", map);
                    vm.cargando = false;
                    break;
                default:
                    toastr.error("Ocurrió un error obteniendo pacientes");
                    vm.cargando = false;
                    break;
            }

        }, function(reason){
            toastr.error("Ocurrió un error obteniendo pacientes");
            vm.cargando = false;
        });
    }

    vm.editarPaciente = function(pacienteEdit){

        vm.editarPacienteCommand.comando = 'ActualizarPaciente';
        vm.editarPacienteCommand.idPaciente = pacienteEdit.idPaciente;
        vm.editarPacienteCommand.tipoIdentificacion = pacienteEdit.tipoIdentificacion;
        vm.editarPacienteCommand.numeroIdentificacion = pacienteEdit.numeroIdentificacion;
        vm.editarPacienteCommand.primerNombre = pacienteEdit.primerNombre;
        vm.editarPacienteCommand.segundoNombre = pacienteEdit.segundoNombre;
        vm.editarPacienteCommand.primerApellido = pacienteEdit.primerApellido;
        vm.editarPacienteCommand.segundoApellido = pacienteEdit.segundoApellido;
        vm.editarPacienteCommand.celular = pacienteEdit.celular;
        vm.editarPacienteCommand.telefono = pacienteEdit.telefono;
        vm.editarPacienteCommand.direccion = pacienteEdit.direccion;
        vm.editarPacienteCommand.fechaNacimiento = pacienteEdit.fechaNacimiento;
        vm.editarPacienteCommand.profesion = pacienteEdit.profesion;
        vm.editarPacienteCommand.observaciones = pacienteEdit.observaciones;
        vm.editarPacienteCommand.sexo = pacienteEdit.sexo;
        vm.editarPacienteCommand.estadoCivil = pacienteEdit.estadoCivil;

        console.log('Actualizar', vm.editarPacienteCommand);

        pacienteService.executeCommand(vm.editarPacienteCommand).then(function(response) {
            switch (response.status) {
                case 200:
                    toastr.success("Se ha actualizado el paciente exitosamente");
                    break;
                default:
                    toastr.error("Ha ocurrido un error actualizando el paciente");
                    break;
            }
        }, function(reason) {
            toastr.error("Ha ocurrido un error actualizando el paciente");
            console.log('error', reason);
        });
    };

    vm.pageChanged = function () {
        console.log("mi pagina es: ", vm.currentPage);
        //se activa el $watch, sobre la variable vm.currentPage
    };

    vm.openEditarPaciente = function(item) {
        var modalInstance = $uibModal.open({
            animation: 'true',
            templateUrl: 'app/paciente/componentes/tabla_paciente/modales/editarPacienteModal.html',
            controller: function($scope, $uibModalInstance, item) {
                $scope.pacienteEdit = <IPaciente>item;

                $scope.close = function() {
                    $uibModalInstance.close();
                };
                $scope.ok = function() {
                    vm.editarPaciente($scope.pacienteEdit);
                    $uibModalInstance.close();
                };
            },
            size: 'lg',
            resolve: {
                item: function() {
                    return item;
                }
            }
        });
    }

    $scope.$watch('vm.currentPage', function(newValue, oldValue) {
        if (newValue === oldValue) return;
        vm.updateTablaPacientes();
    });

    vm.updateTablaPacientes();
}
