import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Paciente } from 'src/app/_model/paciente';
import { Especialidad } from 'src/app/_model/especialidad';
import { Medico } from 'src/app/_model/medico';
import { Examen } from 'src/app/_model/examen';
import { Consulta } from 'src/app/_model/consulta';
import { DetalleConsulta } from 'src/app/_model/detalleConsulta';
import { PacienteService } from 'src/app/_service/paciente.service';
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { MedicoService } from 'src/app/_service/medico.service';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { ExamenService } from 'src/app/_service/examen.service';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-especial',
  templateUrl: './especial.component.html',
  styleUrls: ['./especial.component.css']
})
export class EspecialComponent implements OnInit {
  form: FormGroup;

  pacientes: Paciente[] = [];
  especialidades: Especialidad[] = [];
  medicos: Medico[] = [];
  examenes: Examen[] = [];
  detalleConsulta: DetalleConsulta[] = [];
  examenesSeleccionados: Examen[];

  consulta: Consulta;
  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  diagnostico: string;
  tratamiento: string;

  pacienteSeleccionado: Paciente;
  medicoSeleccionado: Medico;
  especialidadSeleccionada: Especialidad;
  examenSeleccionado: Examen;

  myControlPaciente: FormControl = new FormControl();
  myControlMedico: FormControl = new FormControl();
  filteredOptions: Observable<any[]>;
  filteredOptionsMedico: Observable<any[]>;
  constructor(
    private pacienteService: PacienteService,
    private builder: FormBuilder,
    private especialidadService: EspecialidadService,
    private medicoService: MedicoService,
    private consultaService: ConsultaService,
    private examenService: ExamenService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.form = this.builder.group({
      'paciente': this.myControlPaciente,
      'medico': this.myControlMedico,
      'especialidad': new FormControl(),
      'fecha': new FormControl(new Date()),
      'diagnostico': new FormControl(),
      'tratamiento': new FormControl()
    });

    this.cargarPacientes();
    this.cargarEspecialidades();
    this.cargarMedicos();
    this.cargarExamenes();

    this.filteredOptions = this.myControlPaciente.valueChanges.pipe(map(paciente => this.filter(paciente)));
    this.filteredOptionsMedico = this.myControlMedico.valueChanges.pipe(map(medico => this.filterMedico(medico)));
  }

  displayFn(val: Paciente) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

  displayFnMedico(val: Medico) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

  filterMedico(val: any) {
    if (val != null && val.idMedico > 0) {
      return this.medicos.filter(option =>
        option.nombres.toLowerCase().includes(val.nombres.toLowerCase()) ||
        option.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || option.cmp.includes(val.cmp));
    } else {
      return this.medicos.filter(option =>
        option.nombres.toLowerCase().includes(val.toLowerCase()) ||
        option.apellidos.toLowerCase().includes(val.toLowerCase()) || option.cmp.includes(val));
    }
  }
  filter(val: any) {
    if (val != null && val.idPaciente > 0) {
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.nombres.toLowerCase()) ||
        option.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || option.dni.includes(val.dni));
    } else {
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.toLowerCase()) ||
        option.apellidos.toLowerCase().includes(val.toLowerCase()) || option.dni.includes(val));
    }
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

  seleccionarPaciente(evento: any) {
    this.pacienteSeleccionado = evento.option.value;
  }

  seleccionarMedico(evento: any) {
    this.medicoSeleccionado = evento.option.value;
  }

  aceptar() {

  }

  agregar() {
    if (this.tratamiento != null && this.diagnostico != null) {
    let detalle = new DetalleConsulta();
    detalle.diagnostico = this.diagnostico;
    detalle.tratamiento = this.tratamiento;
    console.log(detalle);
    this.detalleConsulta.push(detalle);
    this.diagnostico = null;
    this.tratamiento = null;
    } else {
      this.snackBar.open('Debe ingesar los campos diagnostico y tratamiento', 'Cerrar', {
        duration: 2000,
      });
    }
  }

  removerDiagnostico(id: number) {}

  estadoBotonRegistrar() {

  }

  ActualizarDiagnostico(id: number, tratamiento: string) {
    if (tratamiento === this.detalleConsulta[id].tratamiento) {
    } else {
      this.detalleConsulta[id].tratamiento = tratamiento;
    }
  }

}
