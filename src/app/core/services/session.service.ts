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

  public crearSesion(username: string, advanceToken: string, menu: any, locations: any){
    this.store.set('username', username);
    this.store.set('advanceToken', this.cripto.encrypt(advanceToken));
    this.store.set('menu', menu);
    this.store.set('locations', locations);
  }

  public cerrarSesion(){
    this.store.remove('username');
    this.store.remove('advanceToken');
    this.store.remove('locations');
    this.store.remove('current');
    this.store.remove('menu');
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


