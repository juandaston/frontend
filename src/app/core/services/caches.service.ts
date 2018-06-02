// constants in typescript
class URL {
  public static get CACHES(): string { return "caches"; }
  public static get CACHES_CIE10(): string { return "caches/cie10"; }
  public static get CACHES_EPS(): string { return "caches/eps/"; }
  public static get CACHES_MUNICIPIOS(): string { return "caches/ciudades"; }
  public static get CACHES_ARLS(): string { return "caches/arls"; }
  public static get ENTIDADES_BANCARIAS(): string { return "caches/bancos"; }
  public static get OFICINAS_PROTECCION(): string { return "caches/oficinas"; }
}

export class CachesService {
  advanceApi: any;
  advanceEnviroment: any;
  /** @ngInject */
  constructor(advanceApi, advanceEnviroment) {
    this.advanceApi = advanceApi;
    this.advanceEnviroment = advanceEnviroment;
  }

  public getListaFiltroCIE10(params): angular.IPromise<any> {
    var url: string = this.advanceEnviroment.url + "/" + URL.CACHES_CIE10;
    return this.advanceApi.get(url, params);
  }

  public getListaFiltroEPS(params) {
    var url: string = this.advanceEnviroment.url + "/" + URL.CACHES_EPS;
    return this.advanceApi.get(url, params);
  }

  public getListaFiltroMunicipio(params) {
    var url: string = this.advanceEnviroment.url + "/" + URL.CACHES_MUNICIPIOS;
    return this.advanceApi.get(url, params);
  }

  public getListaFiltroARL(params) {
    var url: string = this.advanceEnviroment.url + "/" + URL.CACHES_ARLS;
    return this.advanceApi.get(url, params);
  }

  public getListaEntidadesBancarias(params): angular.IPromise<any> {
    var url: string = this.advanceEnviroment.url + "/" + URL.ENTIDADES_BANCARIAS;
    return this.advanceApi.get(url, params);
  }
  public getListaOficinas(params): angular.IPromise<any> {
    var url: string = this.advanceEnviroment.url + "/" + URL.OFICINAS_PROTECCION;
    return this.advanceApi.get(url, params);
  }
}
