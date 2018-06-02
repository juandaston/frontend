class URL {
  public static get LISTA_AFILIACIONES_EPS(): string { return './assets/json/listaAfiliacionesEps.json'; }
  public static get LISTA_ARL(): string { return './assets/json/listaARL.json'; }
  public static get LISTA_CAUSALES_INCONSISTENCIA(): string { return './assets/json/listaCausalesInconsistencia.json'; }
  public static get LISTA_CAUSAS_ACCIDENTES(): string { return './assets/json/listaCausasAccidentes.json'; }
  public static get LISTA_ESTADO_CIVIL(): string { return './assets/json/listaEstadoCivil.json'; }
  public static get LISTA_ESTADOS_AFILIACION(): string { return './assets/json/listaEstadosAfiliacion.json'; }
  public static get LISTA_GENEROS(): string { return './assets/json/listaGeneros.json'; }
  public static get LISTA_GRADOS_ESCOLARIDAD(): string { return './assets/json/listaGradosEscolaridad.json'; }
  public static get LISTA_IDENTIFICACION(): string { return './assets/json/listaIdentificacion.json'; }
  public static get LISTA_PRONOSTICOS_CONCEPTO(): string { return './assets/json/listaPronosticosConcepto.json'; }
  public static get LISTA_TIPO_BENEFICIARIOS_PAGO(): string { return './assets/json/listaTipoBeneficiarioPago.json'; }
  public static get lISTA_TIPO_SOLICITANTE(): string { return './assets/json/listaTipoSolicitante.json'; }
  public static get LISTA_ESTADO_SIT(): string { return './assets/json/listaEstadosSIT.json'; }
  public static get LISTA_SIDEBAR_MENU(): string { return './assets/json/listaSidebarMenu.json'; }
  public static get LISTA_PARENTECOS(): string { return './assets/json/listaParentescos.json'; }
  public static get LISTA_TIPO_PAGO_TUTELA(): string { return './assets/json/listaTipoPagoTutela.json'; }
  public static get LISTA_PAGO_FECHA_ABIERTA_TUTELA(): string { return './assets/json/listaPagoFechaAbiertaTutela.json'; }
  public static get LISTA_CAUSA_RAIZ_TUTELA(): string { return './assets/json/listaCausaRaizTutela.json'; }
  public static get CAUSA_RECHAZO_INCAPACIDAD(): string { return './assets/json/listaCausalesRechazoIncapacidades.json'; }
  public static get LISTA_ENTIDADES_BANCARIAS(): string { return './assets/json/listaEntidadesBancarias.json'; }
  public static get LISTA_TIPOS_DOCUMENTALES(): string { return './assets/json/listaTiposDocumentalesFilenet.json'; }
  public static get DICCIONARIO_ASESORIA(): string { return './assets/json/diccionarioAsesoriaPreliminar.json'; }
  public static get DICCIONARIO_RADICACION(): string { return './assets/json/diccionarioRadicacion.json'; }
  public static get LISTA_TIPOS_VINCULACION_SISTEMA_SOCIAL_SALUD(): string { return './assets/json/listaTiposVinculacionSistemaSocialSalud.json'; }
  public static get LISTA_CAUSAL_CAMBIO_IBC(): string {return './assets/json/listaCausalesCambioIbc.json'; }
}

export class AssetsService {

  $q:any;
  $http: any;
  $base64:any;
  advanceEnvi:any;

  /** @ngInject */
  constructor($q, $http, $base64, advanceEnviroment) {
    this.$q = $q;
    this.$http = $http;
    this.$base64 = $base64;
    this.advanceEnvi = advanceEnviroment;
  }

  public getListaIdentificacion() {
    return this.$http.get(URL.LISTA_IDENTIFICACION);
  }

  public getListaTipoSolicitante() {
    return this.$http.get(URL.lISTA_TIPO_SOLICITANTE);
  }

  public getListaEstadoCivil() {
    return this.$http.get(URL.LISTA_ESTADO_CIVIL);
  }

  public getListaGradosEscolaridad() {
    return this.$http.get(URL.LISTA_GRADOS_ESCOLARIDAD);
  }

  public getListaGeneros() {
    return this.$http.get(URL.LISTA_GENEROS);
  }

  public getListaAfiliacionesEPS() {
    return this.$http.get(URL.LISTA_AFILIACIONES_EPS);
  }

  public getListaCausasAccidentes() {
    return this.$http.get(URL.LISTA_CAUSAS_ACCIDENTES);
  }

  public getListaPronosticos() {
    return this.$http.get(URL.LISTA_PRONOSTICOS_CONCEPTO);
  }

  public getListaEstadosAfiliacion() {
    return this.$http.get(URL.LISTA_ESTADOS_AFILIACION);
  }

  public getListaCausalesInconsistencia() {
    return this.$http.get(URL.LISTA_CAUSALES_INCONSISTENCIA);
  }

  public getListaTipoBeneficiarioPago() {
    return this.$http.get(URL.LISTA_TIPO_BENEFICIARIOS_PAGO);
  }

  public getListaEstadosSIT() {
    return this.$http.get(URL.LISTA_ESTADO_SIT);
  }

  public getListaSidebarMenu() {
    return this.$http.get(URL.LISTA_SIDEBAR_MENU);
  }

  public getListaParentescos() {
    return this.$http.get(URL.LISTA_PARENTECOS);
  }

  public getListaTipoPagoTutela() {
    return this.$http.get(URL.LISTA_TIPO_PAGO_TUTELA);
  }

  public getListaPagoFechaAbiertaTutela() {
    return this.$http.get(URL.LISTA_PAGO_FECHA_ABIERTA_TUTELA);
  }

  public getListaCausaRaizTutela() {
    return this.$http.get(URL.LISTA_CAUSA_RAIZ_TUTELA);
  }

  public getCausalesRechazoIncapacidad() {
    return this.$http.get(URL.CAUSA_RECHAZO_INCAPACIDAD);
  }

  public getListaEntidadesBancarias() {
    return this.$http.get(URL.LISTA_ENTIDADES_BANCARIAS);
  }

  public getListaTiposDocumentalesFilenet() {
    return this.$http.get(URL.LISTA_TIPOS_DOCUMENTALES);
  }

  public getDiccionarioAsesoria() {
    return this.$http.get(URL.DICCIONARIO_ASESORIA);
  }

  public getDiccionarioRadicacion() {
    return this.$http.get(URL.DICCIONARIO_RADICACION);
  }

  public getTipoViculacionSistemaSocialSalud() {
    return this.$http.get(URL.LISTA_TIPOS_VINCULACION_SISTEMA_SOCIAL_SALUD);
  }

  public getListaCausalCambioIbc() {
    return this.$http.get(URL.LISTA_CAUSAL_CAMBIO_IBC);
  }
}
