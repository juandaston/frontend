import { config } from './core.config';
import { run } from './core.run';
import { MensajeFilter } from './filters/mensaje.filter';
import { SessionInterceptor } from './factories/sessionInterceptor';
import { AssetsService } from './services/assets.service';
import { CachesService } from './services/caches.service';
import { AdvUtils } from './services/advUtils.service';
import { AdvanceApi } from './services/advanceApi.service';
import { AuthorizationService } from './services/authorization.service';
import { CIE10Directive } from './components/maestro_cie10/cie10.directive';
import { DatepickerDirective } from './components/datepicker/datepicker.directive';
import { GeorgeBooleDirective } from './components/george_boole/georgeBoole.directive';
import { MaestroEpsDirective } from './components/maestro_eps/maestroEps.directive';
import { MaestroMunicipioDirective } from './components/maestro_municipio/maestroMunicipio.directive';
import { MaestroArlDirective } from './components/maestro_arl/maestroArl.directive';
import { AdvanceValidationsDirective } from './components/advance_validations/advanceValidations.directive';
import { AdvanceMensajesDirective } from './components/advance_mensajes/advanceMensajes.directive';
import { SpinnerDirective } from './components/spinner/spinner.directive';
import { AuthenticationService } from "./services/authentication.service";
import { SessionService } from "./services/session.service";
import { StringToNumberDirective } from "./components/stringToNumber.directive";
import { StopCCPDirective } from "./components/stopccp.directive";
import { AbsFilter } from './filters/abs.filter';
import { CryptoKeyProvider } from './providers/crypto.provider';
import { ClickAndResumeDirective } from './components/click_and_resume/clickAndResume.directive';

declare var moment: moment.MomentStatic;

export default angular.module('consultorio.core', ['ngAnimate', 'ngSanitize', 'ngMessages', 'ui.router', 'ui.bootstrap', 'toastr', 'multipleSelect', 'base64',
  'ngXlsx', 'ngFileSaver', 'angular.filter', 'ngCookies', 'yaru22.jsonHuman', 'angular-storage', 'ngPromiseExtras', 'ngIdle'])
  .constant("advanceEnviroment", {
    "url": "http://181.140.132.200:9000/api",
    "urlAuth": "http://localhost/autorizacion",
    "urlBPM": "http://localhost/bpm",
    "timeout": "15000",
    "timeoutLongTime": "60000",
    "timeoutReportes": "45000",
    "commonProfile":"commons"
  })
  .config(config)
  .run(run)
  .filter('mensaje', MensajeFilter)
  .filter('abs', AbsFilter)
  .factory('sessionInterceptor', SessionInterceptor)
  .provider("CryptoProvider", CryptoKeyProvider)
  .service('assetsService', AssetsService)
  .service('cachesService', CachesService)
  .service('utils', AdvUtils)
  .service('advanceApi', AdvanceApi)
  .service('authorization', AuthorizationService)
  .service('authentication', AuthenticationService)
  .service('sessionService', SessionService)
  .directive('maestroCie10', CIE10Directive)
  .directive('advanceDatepicker', DatepickerDirective)
  .directive('georgeBoole', GeorgeBooleDirective)
  .directive('maestroEps', MaestroEpsDirective)
  .directive('maestroMunicipio', MaestroMunicipioDirective)
  .directive('maestroArl', MaestroArlDirective)
  .directive('advanceValidations', AdvanceValidationsDirective)
  .directive('advanceMensajes', AdvanceMensajesDirective)
  .directive('advanceSpinner', SpinnerDirective)
  .directive('stringToNumber', StringToNumberDirective)
  .directive('stopccp', StopCCPDirective)
  .directive('clickAndResume', ClickAndResumeDirective);
