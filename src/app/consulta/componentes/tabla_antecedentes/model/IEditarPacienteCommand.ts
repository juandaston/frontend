export interface IEditarPacienteCommand {
    comando: string,
    idPaciente: number,
    tipoIdentificacion: string,
    numeroIdentificacion: string,
    primerNombre: string,
    segundoNombre: string,
    primerApellido: string,
    segundoApellido: string,
    celular: string,
    telefono: string,
    direccion: string,
    fechaNacimiento: Date,
    profesion: string,
    observaciones: string,
    sexo: string,
    estadoCivil: string,
}
