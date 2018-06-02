/** @ngInject */
export function routes($stateProvider: angular.ui.IStateProvider,
                       $urlRouterProvider: angular.ui.IUrlRouterProvider) {
    $stateProvider
        .state('layout.paciente', {
            url: 'paciente',
            template: '<root-paciente></root-paciente>'
        });

}
