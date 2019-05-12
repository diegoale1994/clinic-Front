import { Medico } from './medico';
import { Especialidad } from './especialidad';
import { Paciente } from './paciente';
import { DetalleConsulta } from './detalleConsulta';

export class Consulta {
    idConsulta: number;
    medico: Medico;
    paciente: Paciente;
    fecha: string;
    especialidad: Especialidad;
    detalleConsulta: DetalleConsulta[];
}
