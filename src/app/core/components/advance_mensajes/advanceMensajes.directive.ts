export function AdvanceMensajesDirective(): angular.IDirective {
  return {
    restrict: 'E',
    scope: {
      mensajes: '='
    },
    templateUrl: 'app/core/components/advance_mensajes/advanceMensajes.html',
    controller: AdvanceMensajesController,
    controllerAs: 'vm',
    bindToController: true
  };
};

export function AdvanceMensajesController() {
  var vm = this;
}