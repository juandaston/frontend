// constants in typescript
class URL {
    public static get PACIENTE_COMMANDS(): string { return "comandos"; }
    public static get LISTAR_PACIENTES(): string { return "paciente/listarPacientes"; }
    public static get LISTAR_PACIENTES_POR_ID(): string { return "paciente/paciente-por-id"; }
    public static get LISTAR_PACIENTES_POR_CEDULA(): string { return "paciente/paciente-por-cedula"; }
}

export class PacienteService {
    advanceApi: any;
    advanceEnviroment: any;

    /** @ngInject */
    constructor(advanceApi, advanceEnviroment) {
        this.advanceApi = advanceApi;
        this.advanceEnviroment = advanceEnviroment;
    }

    public executeCommand(data) {
        var url: string = this.advanceEnviroment.url + "/" + URL.PACIENTE_COMMANDS;
        return this.advanceApi.post(url, data);
    }

    public getListarPacientes(params): angular.IPromise<any> {
        var url: string = this.advanceEnviroment.url + "/" + URL.LISTAR_PACIENTES + "/" + params.init + "/" + params.limit;
        return this.advanceApi.get(url);
    }

    public getListarPacientePorId(params): angular.IPromise<any> {
        var url: string = this.advanceEnviroment.url + "/" + URL.LISTAR_PACIENTES_POR_CEDULA + "/" + params.tipoIdentificacion + "/" + params.numeroIdentificacion;
        return this.advanceApi.get(url);
    }
}