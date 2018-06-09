export class SessionService {

  store: any;
  utils: any;
  cripto: any;

  /** @ngInject */
  constructor(store, utils, CryptoProvider) {
    this.store = store;
    this.utils = utils;
    this.cripto = CryptoProvider;
  }

  public crearSesion(username: string, consultorioToken: string){
    this.store.set('username', username);
    this.store.set('consultorioToken', this.cripto.encrypt(consultorioToken));
  }

  public cerrarSesion(){
    this.store.remove('username');
    this.store.remove('consultorioToken');
    this.store.remove('current');
  }

  public isAuthenticated() {
    return !this.utils.isNull(this.store.get("advanceToken"));
  };

  public getAuthorizedLocations(){
    return this.store.get("locations");
  }

  public getAuthorizedMenu(){
    return this.store.get("menu");
  }

  public setCurrentTab(currentTab){
    this.store.set('current', currentTab);
  }

  public getCurrentTab(){
    return this.store.get("current");
  }

  public getUsername():string{
    return this.store.get("username");
  }

  public getAdvanceToken():string{
    return this.cripto.decrypt(this.store.get("advanceToken"));
  }
}


