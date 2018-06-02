export function RootHistoriaClinicaDirective(): angular.IDirective {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/historiaclinica/componentes/root_historia_clinica/rootHistoriaClinica.html',
        controller: RootHistoriaClinicaController,
        controllerAs: 'vm',
        bindToController: true
    };
};

/** @ngInject */
export function RootHistoriaClinicaController() {
}