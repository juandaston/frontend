export class AuthorizationService {
  sessionService: any;

  /** @ngInject */
  constructor(sessionService) {
    this.sessionService = sessionService;
  }

  public isAuthorized( state: string) {
    //return (this.sessionService.getAuthorizedLocations().indexOf(state) !== -1);
    return true;
  }
}
