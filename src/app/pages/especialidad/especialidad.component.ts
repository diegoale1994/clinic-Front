import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Especialidad } from 'src/app/_model/especialidad';
import { EspecialidadService } from '../../_service/especialidad.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {
  dataSource: MatTableDataSource<Especialidad>;
  displayedColumns = ['idEspecialidad', 'nombre', 'acciones'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  cantidad: number;
  constructor(public route: ActivatedRoute, private especialidadService: EspecialidadService) { }

  ngOnInit() {

    this.especialidadService.especialidadCambio.subscribe(especialidades => {
      this.dataSource = new MatTableDataSource(especialidades);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cantidad = especialidades.length;
    });

    this.especialidadService.listar().subscribe(especialidades => {
      this.dataSource = new MatTableDataSource(especialidades);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cantidad = especialidades.length;
    });
  }

  eliminar(idEspecialidad: number){
    Swal.fire({
      title: 'Esta seguro que desea eliminar la especialidad ?',
      text: 'La accion no se puede revertir',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si Eliminalo!'
    }).then((result) => {
      if (result.value) {
        this.especialidadService.eliminar(idEspecialidad).subscribe(() => {
          this.especialidadService.listar().subscribe(especialidades => {
           this.especialidadService.especialidadCambio.next(especialidades);
           Swal.fire(
            'Eliminado!',
            'Especialidad eliminada de forma exitosa.',
            'success'
          );
          });
        });
      }
    });
  }

  applyFilter(texto: string) {
    this.dataSource.filter = texto.trim().toLowerCase();
  }

  mostrarMas(e: any) {
  }

}
