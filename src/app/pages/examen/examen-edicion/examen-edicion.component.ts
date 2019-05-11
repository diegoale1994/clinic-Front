import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExamenService } from 'src/app/_service/examen.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Examen } from 'src/app/_model/examen';


@Component({
  selector: 'app-examen-edicion',
  templateUrl: './examen-edicion.component.html',
  styleUrls: ['./examen-edicion.component.css']
})
export class ExamenEdicionComponent implements OnInit {
  idExamen: string;
  form: FormGroup;
  constructor(private examenService: ExamenService, private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.examenService.mensajeCambio.subscribe(mensaje => {
      this.snackBar.open(mensaje, 'Cerrar', {
        duration: 2000,
      });
    });
    this.form = new FormGroup({
      id: new FormControl(0),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.idExamen = params.id;
        this.initForm();
      }
    });
  }
  initForm() {
    if (this.idExamen !== null || this.idExamen !== undefined) {
      this.examenService.listarPorId(this.idExamen).subscribe((examen: Examen) => {
        this.form = new FormGroup({
          id: new FormControl(examen.idExamen),
          nombre: new FormControl(examen.nombre, Validators.required),
          descripcion: new FormControl(examen.descripcion, Validators.required)
        });
      });
   }

}

operar() {
  const examen = new Examen();
  examen.idExamen = this.form.value.id;
  examen.nombre = this.form.value.nombre;
  examen.descripcion = this.form.value.descripcion;
  if (this.form.value.id === 0) {
    this.examenService.registrar(examen).subscribe(() => {
      this.examenService.listar().subscribe(examenes => {
        this.examenService.examenCambio.next(examenes);
        this.examenService.mensajeCambio.next('Examen Registrado con exito');
      });
    });
  } else {
    this.examenService.actualizar(examen).subscribe(() => {
      this.examenService.listar().subscribe(examenes => {
        this.examenService.examenCambio.next(examenes);
        this.examenService.mensajeCambio.next('Examen Actualizado con exito');
      });
    });
  }
  this.router.navigate(['/examen']);
}


}
