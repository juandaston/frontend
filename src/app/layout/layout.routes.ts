/** @ngInject */
export function routes($stateProvider: angular.ui.IStateProvider,
  $urlRouterProvider: angular.ui.IUrlRouterProvider) {
  $stateProvider
    .state('layout', {
      url: '/',
      template: '<login></login>'
    })
    .state('login', {
      url: '/login',
      template: '<login></login>'
    });

  $urlRouterProvider.otherwise('/login');
}
