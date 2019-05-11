import { Component, OnInit, ViewChild } from '@angular/core';
import { ExamenService } from '../../_service/examen.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Examen } from 'src/app/_model/examen';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {
  dataSource: MatTableDataSource<Examen>;
  displayedColumns = ['idExamen', 'nombre', 'descripcion', 'acciones'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  cantidad: number;

  constructor(private examenService: ExamenService) { }

  ngOnInit() {
    this.examenService.examenCambio.subscribe((examenes: Examen[]) => {
      this.dataSource = new MatTableDataSource(examenes);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cantidad = examenes.length;
    });
    this.paginator._intl.itemsPerPageLabel = 'items por pagina';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Atras';
    this.examenService.listar().subscribe(examenes => {
      console.log(examenes);
      this.dataSource = new MatTableDataSource(examenes);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cantidad = examenes.length;
    });
  }

  applyFilter(texto: string) {
    this.dataSource.filter = texto.trim().toLowerCase();
  }

  eliminar(idExamen: number) {

    Swal.fire({
      title: 'Esta seguro que desea eliminar el examen?',
      text: 'La accion no se puede revertir',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si Eliminalo!'
    }).then((result) => {
      if (result.value) {
        this.examenService.eliminar(idExamen).subscribe(() => {
          this.examenService.listar().subscribe(examenes => {
           this.examenService.examenCambio.next(examenes);
           Swal.fire(
            'Eliminado!',
            'Examen eliminado de forma exitosa.',
            'success'
          );
          });
        });
      }
    });
  }
}
