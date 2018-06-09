/** @ngInject */
export function routes($stateProvider: angular.ui.IStateProvider,
  $urlRouterProvider: angular.ui.IUrlRouterProvider) {
  $stateProvider
    .state('layout', {
      url: '/consultorio/',
      template: '<consultorio-root></consultorio-root>'
    })
    .state('login', {
      url: '/',
      template: '<login></login>'
    });

  $urlRouterProvider.otherwise('/login');
}
