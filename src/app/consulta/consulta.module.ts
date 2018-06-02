import { routes } from './consulta.routes';
import { RootConsultaDirective } from './componentes/root_consulta/rootConsulta.directive';
import { PacienteService } from '../paciente/services/paciente.service';
import { TablaAntedentesDirective } from './componentes/tabla_antecedentes/tablaAntecedentes.directive';
import { AntecedentesService } from '../paciente/services/antecedentes.service';
import { ConsultaServices } from './services/consulta.service';

export default angular.module('consultorio.consulta', ['consultorio.core', 'consultorio.layout'])
    .config(routes)
    .directive('rootConsulta', RootConsultaDirective)
    .directive('tablaAntecedentes', TablaAntedentesDirective)
    .service('pacienteService', PacienteService)
    .service('antecedentesService', AntecedentesService)
    .service('consultaServices', ConsultaServices)