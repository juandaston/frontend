// constants in typescript
class URL {
    public static get ANTECEDENTES_POR_CEDULA(): string { return "antecedente/antecedentes-por-id-paciente"; }
}

export class AntecedentesService {
    advanceApi: any;
    advanceEnviroment: any;

    /** @ngInject */
    constructor(advanceApi, advanceEnviroment) {
        this.advanceApi = advanceApi;
        this.advanceEnviroment = advanceEnviroment;
    }

    public getAntecedentesPorIdPaciente(params): angular.IPromise<any> {
        var url: string = this.advanceEnviroment.url + "/" + URL.ANTECEDENTES_POR_CEDULA + "/" + params.idPaciente;
        return this.advanceApi.get(url);
    }


}