class URL {
  public static get RESOURCES(): string { return '/validarUsuario/'; }
  public static get LOGOUT(): string { return '/logout'; }
}

export class AuthenticationService {
  $q:any;
  $http: any;
  $base64:any;
  advanceEnviroment:any;

  /** @ngInject */
  constructor($q, $http, $base64, advanceEnviroment) {
    this.$q = $q;
    this.$http = $http;
    this.$base64 = $base64;
    this.advanceEnviroment = advanceEnviroment;
  }

  public login (username: string, password: string) {
    var deferred = this.$q.defer();
    console.log(username)
      console.log(password)
      console.log(this.$base64.encode(username+":"+password))

      this.$http({
      method: 'GET',
      url: this.advanceEnviroment.urlAuth + URL.RESOURCES,
      headers: {
        'Authorization': 'Basic ' + this.$base64.encode(username+":"+password),
        'Content-Type': 'application/json',
      }
    }).then(function(response) {
      deferred.resolve(response);
    }, function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  }

  public logout () {
    var deferred = this.$q.defer();
    this.$http({
      method: 'GET',
      url: this.advanceEnviroment.urlAuth + URL.LOGOUT,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      deferred.resolve(response);
    }, function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  }

}
