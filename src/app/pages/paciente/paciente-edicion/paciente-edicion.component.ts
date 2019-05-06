import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PacienteService } from 'src/app/_service/paciente.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Paciente } from 'src/app/_model/paciente';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-paciente-edicion',
  templateUrl: './paciente-edicion.component.html',
  styleUrls: ['./paciente-edicion.component.css']
})
export class PacienteEdicionComponent implements OnInit {
  idPaciente: string;
  form: FormGroup;
  constructor(private pacienteService: PacienteService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(0),
      nombres: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      dni: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.idPaciente = params.id;
        this.initForm();
      }
    });
  }

  initForm() {
   if (this.idPaciente !== null || this.idPaciente !== undefined) {
      this.pacienteService.listarPorId(this.idPaciente).subscribe((paciente: Paciente) => {
        this.form = new FormGroup({
          id: new FormControl(paciente.idPaciente),
          nombres: new FormControl(paciente.nombres, Validators.required),
          apellidos: new FormControl(paciente.apellidos, Validators.required),
          dni: new FormControl(paciente.dni, Validators.required),
          direccion: new FormControl(paciente.direccion, Validators.required),
          telefono: new FormControl(paciente.telefono, Validators.required),
          email: new FormControl(paciente.email, [Validators.email, Validators.required]),
        });
      });
   }
  }

  operar() {
    const paciente = new Paciente();
    paciente.idPaciente = this.form.value.id;
    paciente.nombres = this.form.value.nombres;
    paciente.apellidos = this.form.value.apellidos;
    paciente.dni = this.form.value.dni;
    paciente.direccion = this.form.value.direccion;
    paciente.telefono = this.form.value.telefono;
    paciente.email = this.form.value.email;
    if (this.form.value.id === 0) {
      this.pacienteService.registrar(paciente).subscribe(() => {
        this.pacienteService.listar().subscribe(pacientes => {
          this.pacienteService.pacienteCambio.next(pacientes);
          this.snackBar.open('Creado con Exito', 'close', {
            duration: 2000,
          });
        });
      });
    } else {
      this.pacienteService.actualizar(paciente).subscribe(() => {
        this.pacienteService.listar().subscribe(pacientes => {
          this.pacienteService.pacienteCambio.next(pacientes);
          this.snackBar.open('Actualizado con exito', 'close', {
            duration: 2000,
          });
        });
      });
    }
    this.router.navigate(['/paciente']);
  }

}
