import {IPaciente} from "../tabla_paciente/model/IPaciente";
import {IEditarPacienteCommand} from "../tabla_paciente/model/IEditarPacienteCommand";
import {IIngresarPaciente} from "../root_paciente/IIngresarPaciente";

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

    vm.ingresarPaciente = <IIngresarPaciente>{};

    vm.openAgregarPacienteModal = function () {
        var modalInstance = $uibModal.open({
            animation: 'true',
            templateUrl: 'app/paciente/componentes/root_paciente/modal/agregarPacienteModal.html',
            controller: function ($scope, $uibModalInstance, info) {
                $scope.close = function() {
                    $uibModalInstance.close();
                };
                $scope.aceptar = function() {
                    vm.ingresarPaciente.comando = 'IngresarPaciente';
                    vm.ingresarPaciente.tipoIdentificacion = $scope.tipoIdentificacion
                    vm.ingresarPaciente.numeroIdentificacion = $scope.numeroIdentificacion
                    vm.ingresarPaciente.primerNombre = $scope.primerNombre
                    vm.ingresarPaciente.segundoNombre = $scope.segundoNombre
                    vm.ingresarPaciente.primerApellido = $scope.primerApellido
                    vm.ingresarPaciente.segundoApellido = $scope.segundoApellido
                    vm.ingresarPaciente.celular = $scope.celular
                    vm.ingresarPaciente.telefono = $scope.telefono
                    vm.ingresarPaciente.direccion = $scope.direccion
                    vm.ingresarPaciente.fechaNacimiento = $scope.fechaNacimiento
                    vm.ingresarPaciente.profesion = $scope.profesion
                    vm.ingresarPaciente.observaciones = $scope.observaciones
                    vm.ingresarPaciente.sexo = $scope.genero
                    vm.ingresarPaciente.estadoCivil = $scope.estadoCivil

                    console.log(vm.ingresarPaciente)

                    pacienteService.executeCommand(vm.ingresarPaciente).then(function(response) {
                        switch (response.status) {
                            case 200:
                                toastr.success("Se ha ingresando el paciente correctamente");
                                $uibModalInstance.close();
                                vm.cargarListaPacientes();
                                break;
                            default:
                                toastr.error("Ha ocurrido un error ingresando el paciente");
                                break;
                        }
                    }, function(reason) {
                        toastr.error("Ha ocurrido un error ingresando el paciente");
                        console.log('error', reason);
                    });
                };
            },
            size: 'lg',
            resolve: {
                info: function () {
                    return vm.model;
                },
                vm: function () {
                    return vm;
                }
            }
        });
    };

    $scope.$on('UPDATE_TABLA_PACIENTE_CHILD', function(event, data) {
        console.log("Datos  +++++++++++++", data);
        vm.cargarListaPacientes();
    });

    vm.cargarListaPacientes = function(){
        vm.cargando = true;
        var params = {
            'init': vm.itemsPerPage * (vm.currentPage - 1),
            'limit': vm.itemsPerPage
        }

        pacienteService.getListarPacientes(params).then(function(response) {
            switch (response.status) {
                case 200:
                    var map = response.data;
                    vm.totalItems = map.totalRegistros;
                    vm.listaPacientes = map.pacientes;
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

        vm.cargarListaPacientes();
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
        vm.cargarListaPacientes();
    });

    vm.cargarListaPacientes();
}
