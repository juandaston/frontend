// constants in typescript
class URL {
    public static get CONSULTA_COMMANDS(): string { return "comandos"; }
}

export class ConsultaServices {
    advanceApi: any;
    advanceEnviroment: any;

    /** @ngInject */
    constructor(advanceApi, advanceEnviroment) {
        this.advanceApi = advanceApi;
        this.advanceEnviroment = advanceEnviroment;
    }

    public executeCommand(data) {
        var url: string = this.advanceEnviroment.url + "/" + URL.CONSULTA_COMMANDS;
        return this.advanceApi.post(url, data);
    }
}