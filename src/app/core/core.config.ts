/** @ngInject */
export function config($locationProvider: angular.ILocationProvider,
                       $logProvider: angular.ILogProvider,
                       toastrConfig: any,
                       $httpProvider,
                       storeProvider,
                       $idleProvider,
                       $keepaliveProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');

  $logProvider.debugEnabled(true);

  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.autoDismiss = true;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = false;
  toastrConfig.progressBar = true;

  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};

  storeProvider.setStore('sessionStorage');

  $idleProvider.idleDuration(900); // in seconds
  $idleProvider.warningDuration(300); // in seconds
  $keepaliveProvider.interval(1); // in seconds
}
