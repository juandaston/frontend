/** @ngInject */
export function run($log: angular.ILogService, $idle) {
  $log.debug('Consola Consultorio');
  $idle.watch();
}
