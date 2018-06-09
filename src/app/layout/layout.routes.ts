/** @ngInject */
export function routes($stateProvider: angular.ui.IStateProvider,
  $urlRouterProvider: angular.ui.IUrlRouterProvider) {
  $stateProvider
    .state('layout', {
      url: '/',
      template: '<consultorio-root></consultorio-root>'
    })
    .state('login', {
      url: '/login',
      template: '<login></login>'
    });

  $urlRouterProvider.otherwise('/login');
}
