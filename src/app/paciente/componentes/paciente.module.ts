import { routes } from './paciente.routes';
import { RootPacienteDirective } from './root_paciente/rootPaciente.directive';
import { TablaPacienteDirective } from './tabla_paciente/tablaPaciente.directive';
import { PacienteService } from '../services/paciente.service';

export default angular.module('consultorio.paciente', ['consultorio.core', 'consultorio.layout'])
    .config(routes)
    .service('pacienteService', PacienteService)
    .directive('rootPaciente', RootPacienteDirective)
    .directive('tablaPaciente', TablaPacienteDirective)