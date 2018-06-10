import {IIngresarAntecedente} from "../tabla_antecedentes/model/IIngresarAntecedente";

export function TablaAntedentesDirective(): angular.IDirective {
    return {
        restrict: 'E',
        scope: {
            idpac: '@'
        },
        templateUrl: 'app/consulta/componentes/tabla_antecedentes/tablaAntecedentes.html',
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
    vm.itemsPerPage = 5;
    vm.filtroAfiliado = {};
    vm.listaAntecedentes = [];

    vm.ingresarAntecedente = <IIngresarAntecedente>{};
    vm.editarAntecedenteCommand = <IIngresarAntecedente>{};

    $scope.$on('UPDATE_TABLA_ANTECEDENTES', function(event, data) {
        var params = {
            'idPaciente': data,
            'init': vm.itemsPerPage * (vm.currentPage - 1),
            'limit': vm.itemsPerPage}

        antecedentesService.getAntecedentesPorIdPaciente(params).then(function(response) {
            switch (response.status) {
                case 200:
                    var map = response.data;
                    if(map == null){
                        toastr.info("No existen antedentes para la cedula");
                    }else{
                        console.log('Consulta antecedentes: ', map);
                        vm.listaAntecedentes = map.antecedentes;
                        vm.totalItems = map.totalRegistros;
                        console.log("total items", vm.totalItems);
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

    vm.openAgregarAntecedenteModal = function () {
        var modalInstance = $uibModal.open({
            animation: 'true',
            templateUrl: 'app/consulta/componentes/tabla_antecedentes/modales/agregarAntecedenteModal.html',
            controller: function ($scope, $uibModalInstance, info) {
                $scope.close = function() {
                    $uibModalInstance.close();
                };
                $scope.aceptar = function() {
                    vm.ingresarAntecedente.comando = 'IngresarAntecedente';
                    vm.ingresarAntecedente.idPaciente = vm.idpac;
                    vm.ingresarAntecedente.tipo = $scope.tipo;
                    vm.ingresarAntecedente.descripcion = $scope.descripcion;

                    console.log(vm.ingresarAntecedente)

                    antecedentesService.executeCommand(vm.ingresarAntecedente).then(function(response) {
                        switch (response.status) {
                            case 200:
                                toastr.success("Se ha ingresando el paciente correctamente");
                                $uibModalInstance.close();
                                break;
                            default:
                                toastr.error("Ha ocurrido un error ingresando el antecedente");
                                break;
                        }
                    }, function(reason) {
                        toastr.error("Ha ocurrido un error ingresando el antecedente");
                        console.log('error', reason);
                    });
                };
                $scope.$broadcast("UPDATE_TABLA_ANTECEDENTES", vm.idpac);
            },
            size: 'md',
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

    vm.openEditarAntecedente = function(item) {
        var modalInstance = $uibModal.open({
            animation: 'true',
            templateUrl: 'app/consulta/componentes/tabla_antecedentes/modales/editarAntecedenteModal.html',
            controller: function($scope, $uibModalInstance, item) {
                $scope.antecedenteEdit = item;

                $scope.close = function() {
                    $uibModalInstance.close();
                };
                $scope.aceptar = function() {
                    vm.editarAntecedente($scope.antecedenteEdit);
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

    vm.editarAntecedente = function(antecedenteEdit){

        vm.editarAntecedenteCommand.comando = 'EditarAntecedente';
        vm.editarAntecedenteCommand.idAntecedente = antecedenteEdit.idAntecedentes;
        vm.editarAntecedenteCommand.idPaciente = vm.idpac;
        vm.editarAntecedenteCommand.tipo = antecedenteEdit.tipo;
        vm.editarAntecedenteCommand.descripcion = antecedenteEdit.descripcion;

        console.log('Actualizar', vm.editarAntecedenteCommand);

        antecedentesService.executeCommand(vm.editarAntecedenteCommand).then(function(response) {
            switch (response.status) {
                case 200:
                    toastr.success("Se ha actualizado el antecedente exitosamente");
                    break;
                default:
                    toastr.error("Ha ocurrido un error actualizando el antecedente");
                    break;
            }
        }, function(reason) {
            toastr.error("Ha ocurrido un error actualizando el antecedente");
            console.log('error', reason);
        });
    };


    vm.pageChanged = function () {
        console.log("mi pagina es: ", vm.currentPage);
        //se activa el $watch, sobre la variable vm.currentPage
    };

    //paginacion
    $scope.$watch('vm.currentPage', function (newValue, oldValue) {
        if (newValue === oldValue) return;
        $scope.$broadcast("UPDATE_TABLA_ANTECEDENTES", vm.idpac);
    });

    $scope.$broadcast("UPDATE_TABLA_ANTECEDENTES", vm.idpac);
}
