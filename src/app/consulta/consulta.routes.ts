/** @ngInject */
export function routes($stateProvider: angular.ui.IStateProvider,
                       $urlRouterProvider: angular.ui.IUrlRouterProvider) {
    $stateProvider
        .state('layout.consulta', {
            url: 'consulta',
            template: '<root-consulta></root-consulta>'
        });

}
