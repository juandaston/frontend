/// <reference path="../../.tmp/typings/tsd.d.ts"/>

import core from './core/core.module';
import layout from './layout/layout.module';
import consulta from './consulta/consulta.module'
import paciente from './paciente/componentes/paciente.module'
import historia from './historiaclinica/historia_clinica.module'
namespace consultorio {
  'use strict';

  angular.module('consultorio', [historia.name,core.name, layout.name, consulta.name, paciente.name]);
}
