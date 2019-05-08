import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EspecialidadService } from '../../../_service/especialidad.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Especialidad } from 'src/app/_model/especialidad';

@Component({
  selector: 'app-especialidad-edicion',
  templateUrl: './especialidad-edicion.component.html',
  styleUrls: ['./especialidad-edicion.component.css']
})
export class EspecialidadEdicionComponent implements OnInit {
  idEspecialidad: string;
  form: FormGroup;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
              private especialidadService: EspecialidadService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.especialidadService.mensajeCambio.subscribe(mensaje => {
      this.snackBar.open(mensaje, 'Cerrar', {
        duration: 2000,
      });
    });
    this.form = new FormGroup({
      id: new FormControl(0),
      nombre: new FormControl('', Validators.required)
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.idEspecialidad = params.id;
        this.initForm();
      }
    });
  }
  initForm() {
    if (this.idEspecialidad !== null || this.idEspecialidad !== undefined) {
      this.especialidadService.listarPorId(this.idEspecialidad).subscribe((especialidad: Especialidad) => {
        this.form = new FormGroup({
          id: new FormControl(especialidad.idEspecialidad),
          nombre: new FormControl(especialidad.nombre),
        });
      });
   }
  }

  operar() {
    const especialidad = new Especialidad();
    especialidad.idEspecialidad = this.form.value.id;
    especialidad.nombre = this.form.value.nombre;
    if (this.form.value.id === 0) {
      this.especialidadService.registrar(especialidad).subscribe(() => {
        this.especialidadService.listar().subscribe(especialidades => {
          this.especialidadService.especialidadCambio.next(especialidades);
          this.especialidadService.mensajeCambio.next('Especialidad Registrada con exito');
        });
      });
    } else {
      this.especialidadService.actualizar(especialidad).subscribe(() => {
        this.especialidadService.listar().subscribe(especialidades => {
          this.especialidadService.especialidadCambio.next(especialidades);
          this.especialidadService.mensajeCambio.next('Especialidad Actualizada con exito');
        });
      });
    }
    this.router.navigate(['/especialidad']);
  }

}
