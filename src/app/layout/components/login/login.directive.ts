export interface LoginForm {
  username: string;
  password: string;
}

export function LoginDirective(): angular.IDirective {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/layout/components/login/login.html',
    controller: LoginController,
    controllerAs: 'crtl',
    bindToController: true
  };
};

/** @ngInject */
export function LoginController($scope, $base64, $state, toastr, authentication, sessionService) {
  var form = <LoginForm>{};
  angular.extend($scope, { form: form });

  $scope.login = function () {
    if($scope.advanceForm.$valid){
      var menu = '[{"prioridad":"A","label":"Casos","navbar":"","sref":"layout.caso","sideBar":[]},{"prioridad":"B","label":"Conceptos","navbar":"layout.conceptonavbar","sref":"layout","sideBar":[{"prioridad":1,"label":"Registro de Conceptos","sref":"layout.concepto"},{"prioridad":2,"label":"Multiples Conceptos","sref":"layout.multiplesconceptos"}]},{"prioridad":"C","label":"Asesorías","navbar":"layout.asesorianavbar","sref":"layout","sideBar":[{"prioridad":1,"label":"Asesoría Preliminar Línea","sref":"layout.asesoriapreliminarlinea"},{"prioridad":2,"label":"Asesoría ODS","sref":"layout.asesoria"},{"prioridad":3,"label":"Completar datos de contacto","sref":"layout.compdatoscontacto"},{"prioridad":4,"label":"Modificar Asesoría","sref":"layout.modificarasesoria"},{"prioridad":5,"label":"SIT Cuenta Inactiva","sref":"layout.sitcuentainactiva"},{"prioridad":6,"label":"SIT sin incapacidades","sref":"layout.sitsinincapacidades"},{"prioridad":7,"label":"Solicitar Historia Clínica","sref":"layout.solicitarhistoriaclinica"},{"prioridad":8,"label":"Finalización de Pagos","sref":"layout.finalizaciondepagos"},{"prioridad":9,"label":"Entrega comunicado finalización de pago","sref":"layout.entcomfinpago"}]},{"prioridad":"D","label":"Radicación","navbar":"layout.radicacionnavbar","sref":"layout","sideBar":[{"prioridad":1,"label":"Radicar SIT","sref":"layout.radicacion"},{"prioridad":2,"label":"Actualización de Datos","sref":"layout.actualizaciondatos"}]},{"prioridad":"E","label":"Acciones Legales","navbar":"layout.accioneslegalesnavbar","sref":"layout","sideBar":[{"prioridad":1,"label":"Registrar Acción Legal","sref":"layout.tutelainc"},{"prioridad":2,"label":"Gestionar Acción Legal","sref":"layout.tablagestionartutelas"},{"prioridad":2,"label":"Editar Acción Legal","sref":"layout.tablaeditartutelas"},{"prioridad":4,"label":"Reporte No Normalizables","sref":"layout.nonormalizables"},{"prioridad":5,"label":"Decidir cobro para tutela","sref":"layout.bandejadecisioncobrotutela"},{"prioridad":6,"label":"Asignar EPS Acción Legal","sref":"layout.asignarepsaccionlegal"}]},{"prioridad":"F","label":"Pagos","navbar":"layout.pagosnavbar","sref":"layout","sideBar":[{"prioridad":1,"label":"Solicitar Autorización de Pagos","sref":"layout.autorizarpagos"},{"prioridad":2,"label":"Listar todos los pagos","sref":"layout.tablapagos"},{"prioridad":3,"label":"Histórico de Pagos","sref":"layout.historicopagos"},{"prioridad":4,"label":"Gestión de Pagos Rechazados","sref":"layout.gestionarpagosrechazados"},{"prioridad":5,"label":"Gestión de Cuentas Rechazadas","sref":"layout.gestionarpagosrechazadosbpm"},{"prioridad":6,"label":"Aprobar Contabilidad","sref":"layout.aprobarcontabilidad"},{"prioridad":7,"label":"Gestionar Transacción Servicios Financieros","sref":"layout.gestionarserviciosfinancieros"},{"prioridad":8,"label":"Aprobar Pagos","sref":"layout.aprobarpagos"},{"prioridad":9,"label":"Seguimiento Contabilidad","sref":"layout.contabilidad"},{"prioridad":10,"label":"Seguimiento Servicios Financieros","sref":"layout.procesarpagossir"},{"prioridad":11,"label":"Seguimiento SAP","sref":"layout.procesarpagossap"}]},{"prioridad":"G","label":"Definición","navbar":"layout.definicionnavbar","sref":"layout","sideBar":[{"prioridad":1,"label":"Generar archivo de cobro","sref":"layout.generarcobroprevisional"},{"prioridad":2,"label":"Completar información para Cobro","sref":"layout.bandeja"},{"prioridad":3,"label":"Completar información de Reintegros","sref":"layout.bandejareintegros"},{"prioridad":4,"label":"Respuesta de Cobros","sref":"layout.cargasolicitudescobro"},{"prioridad":5,"label":"Rechazo de Cobros","sref":"layout.cargasolicitudescobrorechazadas"},{"prioridad":6,"label":"Respuesta de Ajustes","sref":"layout.cargaajustesolicitudescobro"},{"prioridad":7,"label":"Cargar Documentos","sref":"layout.cargardocumentos"},{"prioridad":8,"label":"Completar información para ajuste","sref":"layout.cargareintegroprevisional"},{"prioridad":9,"label":"Envío de documentos a la Aseguradora","sref":"layout.detenercobro"},{"prioridad":10,"label":"Detener Cobro","sref":"layout.bandejaaseguradora"},{"prioridad":11,"label":"Reinicio de Caso","sref":"layout.reiniciarsolicitudparacobro"}]},{"prioridad":"H","label":"Novedades","navbar":"layout.novedadesnavbar","sref":"layout","sideBar":[{"prioridad":1,"label":"Registro de Incapacidades","sref":"layout.incapacidades"},{"prioridad":2,"label":"Revisión de Incapacidades","sref":"layout.revisionincapacidades"},{"prioridad":3,"label":"Registro de Causales de Finalización","sref":"layout.finalizacionsit"},{"prioridad":4,"label":"Cambio día 181 y/o de Inicio de Pago","sref":"layout.cambiodia181yofechainiciopago"}]},{"prioridad":"I","label":"Reportes","navbar":"layout.reportesnavbar","sref":"layout","sideBar":[{"prioridad":1,"label":"Reporte de Comunicados","sref":"layout.reportecomunicados"},{"prioridad":2,"label":"Consulta de Solicitudes IT","sref":"layout.consultarsolicitudesit"},{"prioridad":3,"label":"Eventos Completos","sref":"layout.reporteeventoscompletos"}]},{"prioridad":"J","label":"Administración","navbar":"layout.administracionnavbar","sref":"layout","sideBar":[{"prioridad":1,"label":"Generar BD Reserva","sref":"layout.generaractualizacionreserva"},{"prioridad":2,"label":"Configurar Documentos Requeridos Cobro","sref":"layout.documentospagoprevisional"},{"prioridad":3,"label":"Solicitudes pendientes de Registro en IPS","sref":"layout.bandejaips"},{"prioridad":4,"label":"Administrar Línea de Servicio","sref":"layout.administrarlineadeservicio"},{"prioridad":5,"label":"Adm SIT Cuenta Inactiva","sref":"layout.admsitcuentainactiva"},{"prioridad":6,"label":"Adm SIT sin Incapacidades","sref":"layout.administrarsitsinincapacidades"},{"prioridad":7,"label":"Adm Asesoría Preliminar","sref":"layout.administrarasesoriapreliminar"},{"prioridad":8,"label":"Adm Solicitar Historia Clínica","sref":"layout.admsolicitarhistoriaclinica"},{"prioridad":9,"label":"Adm EPS","sref":"layout.admeps"},{"prioridad":10,"label":"Adm SIT finalización de Pago","sref":"layout.admsitfinpago"},{"prioridad":11,"label":"Solicitudes sin documentos en IPS","sref":"layout.solicitudessindocumentosips"},{"prioridad":12,"label":"Bandeja de Reintentos","sref":"layout.tareas"},{"prioridad":13,"label":"Roles por comando","sref":"layout.rolesxcomando"},{"prioridad":14,"label":"Roles por locación","sref":"layout.rolesxlocation"},{"prioridad":15,"label":"Actualizar caches","sref":"layout.actualizarcaches"}]}]'
        var location = 'layout.concepto'
        var username = form.username;
        var advanceToken  = $base64.encode(form.username+":"+form.password);
        sessionService.crearSesion( username, advanceToken, menu, location);

      authentication.login( form.username, form.password).then(function (response) {
        switch(response.status){
          case 200:
            var username = form.username;
            var advanceToken  = $base64.encode(form.username+":"+form.password);
            sessionService.crearSesion( username, advanceToken, response.data["menu"], response.data["ubicaciones"]);
            var numSesionesAbiertas = response.data["sesiones-abiertas"];
            if(numSesionesAbiertas != '1'){
              toastr.info("Usted tiene " + numSesionesAbiertas + " sesiones abiertas simultáneamente.");
            }
            $state.go('layout');
            break;
          default:
            toastr.error("Error en la autenticacion");
        }
      }, function (reason) {
        switch(reason.status) {
          case 401:
            toastr.info("Usuario/Password Incorrectos");
            break;
          default:
            toastr.error("Error en la autenticacion");
        }
      });
    }
  }
}
