export class AdvanceApi {
  $http: any;
  $base64: any;
  $q: any;
  advanceEnviroment: any;

  /** @ngInject */
  constructor($http, $base64, $q, advanceEnviroment) {
    this.$http = $http;
    this.$base64 = $base64;
    this.$q = $q;
    this.advanceEnviroment = advanceEnviroment;
  }

  public get(url: string, params: any) {
    var deferred = this.$q.defer();
    this.$http({
      method: 'GET',
      cache: false,
      url: url,
      params: params,
      timeout: this.advanceEnviroment.timeout,
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

  public getLongTime(url: string, params: any) {
    var deferred = this.$q.defer();
    this.$http({
      method: 'GET',
      url: url,
      params: params,
      timeout: this.advanceEnviroment.timeoutLongTime,
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


  public post(url: string, data: any) {
    var deferred = this.$q.defer();
    this.$http({
      method: 'POST',
      url: url,
      data: data,
      timeout: this.advanceEnviroment.timeout,
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

  public postLongTime(url: string, data: any) {
    var deferred = this.$q.defer();
    this.$http({
      method: 'POST',
      url: url,
      data: data,
      timeout: this.advanceEnviroment.timeoutLongTime,
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

  public getPdf(url: string, params: any) {
    var deferred = this.$q.defer();
    this.$http({
      method: 'GET',
      url: url,
      params: params,
      timeout: this.advanceEnviroment.timeoutReportes,
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

  public postPdf(url: string, data: any) {
    var deferred = this.$q.defer();
    this.$http({
      method: 'POST',
      url: url,
      data: data,
      timeout: this.advanceEnviroment.timeoutReportes,
      responseType: 'arraybuffer',
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

  public upload(url: string, file: any, data: any) {
    var fd = new FormData();
    fd.append('file', file);
    if (angular.isDefined(data)) {
      console.log('data', JSON.stringify( data ));
       fd.append('data', JSON.stringify( data ) );
    }

    var deferred = this.$q.defer();
    this.$http({
      method: 'POST',
      url: url,
      data: fd,
      timeout: this.advanceEnviroment.timeoutReportes,
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined
      }
    }).then(function(response) {
      deferred.resolve(response);
    }, function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  }

}
