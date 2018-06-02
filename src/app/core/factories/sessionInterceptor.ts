/** @ngInject */
export function SessionInterceptor($log, $q, $injector, $location, authorization, sessionService) {
  var myInterceptor = {
    request: function (config) {
      var deferred = $q.defer();
      var canceler = $q.defer();
      var $state = $injector.get('$state');
      var current = $state.current.name;
      var url = config["url"];

      config.timeout = canceler.promise;

      // $log.debug({
      //   url:url,
      //   authenticated: sessionService.isAuthenticated(),
      //   current:  current
      // });

      // login es publico
      if ( ['login','logout', 'intro'].indexOf($state.current.name) !== -1 ) {
        deferred.resolve(config);
        return deferred.promise;
      }

      if( !sessionService.isAuthenticated() ){
        canceler.resolve(); // Canceling request
        $location.url('/Login');
      } else {
        if( !authorization.isAuthorized(current) ) {
          $log.error("No tiene acceso al estado", current);
          canceler.resolve(); // Canceling request
        } else {
          config.headers['Authorization'] = 'Basic '+sessionService.getAdvanceToken();
          deferred.resolve( config );
        }
      }
      return deferred.promise;
    }
  };

  return myInterceptor;
}
