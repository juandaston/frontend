/** @ngInject */
export function routes($stateProvider: angular.ui.IStateProvider,
                       $urlRouterProvider: angular.ui.IUrlRouterProvider) {
    $stateProvider
        .state('layout.historiaclinica', {
            url: 'historia',
            template: '<root-historia-clinica></root-historia-clinica>'
        });
}
