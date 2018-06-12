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

    vm.ingresarPaciente = <IIngresarPaciente>{};

    vm.openAgregarPacienteModal = function () {
        if ($scope.advanceForm.$valid) {
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
                                    $scope.$broadcast("UPDATE_TABLA_CASO_TUTELAS_CHILD", "");
                                    $uibModalInstance.close();
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

        } else {
            $filter('mensaje')(vm.mensajes, {id: "faltanCampos"}, {visible: true});
        }
    };

}