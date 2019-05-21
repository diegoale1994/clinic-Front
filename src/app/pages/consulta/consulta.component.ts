import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from '../../_service/paciente.service';
import { EspecialidadService } from '../../_service/especialidad.service';
import { MedicoService } from '../../_service/medico.service';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { MatSnackBar } from '@angular/material';
import { ExamenService } from 'src/app/_service/examen.service';
import { Especialidad } from 'src/app/_model/especialidad';
import { Examen } from 'src/app/_model/examen';
import { Medico } from 'src/app/_model/medico';
import { DetalleConsulta } from 'src/app/_model/detalleConsulta';
import { Consulta } from 'src/app/_model/consulta';
import { ConsultaListaExamenDTO } from 'src/app/_model/consultaListaExamenDTO';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  especialidades: Especialidad[] = [];
  pacientes: Paciente[] = [];
  examenes: Examen[] = [];
  medicos: Medico[] = [];
  idPacienteSeleccionado: number;
  idEspecialidadSeleccionado: number;
  idMedicoSeleccionado: number;
  fechaSeleccionada = new Date();
  idExamenSeleccionado: string;
  maxFecha: Date = new Date();
  diagnostico: string;
  mensaje: string;
  tratamiento: string;
  detalleConsulta: DetalleConsulta[] = [];
  examenesSeleccionados: Examen[] = [];
  constructor(
    private pacienteService: PacienteService,
    private especialidadService: EspecialidadService,
    private medicoService: MedicoService,
    private consultaService: ConsultaService,
    private examenService: ExamenService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.cargarPacientes();
    this.cargarEspecialidades();
    this.cargarMedicos();
    this.cargarExamenes();
  }
  cargarExamenes() {
    this.examenService.listar().subscribe(examenes => {
      this.examenes = examenes;
    });
  }
  cargarMedicos() {
    this.medicoService.listar().subscribe(medicos => {
      this.medicos = medicos;
    });
  }
  cargarEspecialidades() {
    this.especialidadService.listar().subscribe(especialidades => {
      this.especialidades = especialidades;
    });
  }
  cargarPacientes() {
    this.pacienteService.listar().subscribe(pacientes => {
      this.pacientes = pacientes;
    });
  }

  agregar() {
    if (this.tratamiento != null && this.diagnostico != null) {
      const det = new DetalleConsulta();
      det.tratamiento = this.tratamiento;
      det.diagnostico = this.diagnostico;
      this.detalleConsulta.push(det);
      this.diagnostico = null;
      this.tratamiento = null;
    } else {
      this.snackBar.open('Debe ingesar los campos diagnostico y tratamiento', 'Cerrar', {
        duration: 2000,
      });
    }
  }

  removerDiagnostico(i: number) {
    this.detalleConsulta.splice(i, 1);
  }

  agregarExamen() {
    if (+this.idExamenSeleccionado > 0) {
      let bandera = false;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.examenesSeleccionados.length; i++) {
        const examen = this.examenesSeleccionados[i];
        if (examen.idExamen === this.idExamenSeleccionado) {
          bandera = true;
          break;
        }
      }
      if (bandera) {
        this.snackBar.open('Examen repetido', 'Cerrar', {
          duration: 2000,
        });
      } else {
        const examen = new Examen();
        examen.idExamen = this.idExamenSeleccionado;
        this.examenService
          .listarPorId(this.idExamenSeleccionado)
          .subscribe(examenO => {
            examen.nombre = examenO.nombre;
            this.examenesSeleccionados.push(examen);
          });
      }
    } else {
      this.snackBar.open('debe agregar un examen', 'Cerrar', {
        duration: 2000,
      });
    }
  }

  removerExamen(i: number) {
    this.examenesSeleccionados.splice(i, 1);
  }
  estadobotonRegistrar() {
    return (this.detalleConsulta.length === 0 || this.idEspecialidadSeleccionado === null ||
      this.idMedicoSeleccionado === null || this.idPacienteSeleccionado === null);
  }
  aceptar() {
    const consulta = new Consulta();
    const especialidad = new Especialidad();
    especialidad.idEspecialidad = this.idEspecialidadSeleccionado;
    const paciente = new Paciente();
    paciente.idPaciente = this.idPacienteSeleccionado;
    const medico = new Medico();
    medico.idMedico = this.idMedicoSeleccionado;
    consulta.especialidad = especialidad;
    consulta.medico = medico;
    consulta.paciente = paciente;
    consulta.detalleConsulta = this.detalleConsulta;
    const tzoffset = (this.fechaSeleccionada).getTimezoneOffset() * 60000;
    const localIsoTime = (new Date(Date.now() - tzoffset)).toISOString();
    consulta.fecha = localIsoTime;
    const consultaDTO = new ConsultaListaExamenDTO();
    consultaDTO.consulta = consulta;
    consultaDTO.listExamen = this.examenesSeleccionados;
    this.consultaService.registrar(consultaDTO).subscribe(() => {
      this.snackBar.open('Se registro la consulta', 'Cerrar', {
        duration: 2000,
      });
    });
  }

  ActualizarDiagnostico(id: number, tratamiento: string) {
    if (tratamiento === this.detalleConsulta[id].tratamiento) {
    } else {
      this.detalleConsulta[id].tratamiento = tratamiento;
    }
  }
}
