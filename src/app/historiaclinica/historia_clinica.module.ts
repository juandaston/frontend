import { routes } from './historia_clinica.routes';
import { RootHistoriaClinicaDirective } from './componentes/root_historia_clinica/rootHistoriaClinica.directive';
import { TablaAntedentesDirective } from './componentes/tabla_antecedentes/tablaAntecedentes.directive';
import { TablaExamenFisioDirective } from './componentes/tabla_examen_fisico/tablaExamenFisico.directive';
import { AntecedentesService } from '../paciente/services/antecedentes.service';

export default angular.module('consultorio.historiaclinica', ['consultorio.core', 'consultorio.layout'])
    .config(routes)
    .directive('rootHistoriaClinica', RootHistoriaClinicaDirective)
    .directive('tablaAntedentes', TablaAntedentesDirective)
    .directive('tablaExamenFisico', TablaExamenFisioDirective)
    .service('antecedentesService', AntecedentesService)