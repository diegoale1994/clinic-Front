import { Component, OnInit, ViewChild } from '@angular/core';
import { PacienteService } from 'src/app/_service/paciente.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Paciente } from 'src/app/_model/paciente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  dataSource: MatTableDataSource<Paciente>;
  displayedColumns = ['idPaciente', 'nombres', 'apellidos', 'telefono', 'acciones'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  cantidad: number;
  constructor(private pacienteService: PacienteService) { }

  ngOnInit() {
    this.pacienteService.pacienteCambio.subscribe((pacientes: Paciente[]) => {
      this.dataSource = new MatTableDataSource(pacientes);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cantidad = pacientes.length;
    });
    this.paginator._intl.itemsPerPageLabel = 'items por pagina';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Atras';
    this.pacienteService.listar().subscribe(pacientes => {
      this.dataSource = new MatTableDataSource(pacientes);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cantidad = pacientes.length;
    });
  }

  applyFilter(texto: string) {
    this.dataSource.filter = texto.trim().toLowerCase();
  }

  mostrarMas(e: any) {
  }

  eliminar(idPaciente: number) {

    Swal.fire({
      title: 'Esta seguro que desea eliminar el paciente?',
      text: 'La accion no se puede revertir',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si Eliminalo!'
    }).then((result) => {
      if (result.value) {
        this.pacienteService.eliminar(idPaciente).subscribe(() => {
          this.pacienteService.listar().subscribe(pacientes => {
           this.pacienteService.pacienteCambio.next(pacientes);
           Swal.fire(
            'Eliminado!',
            'Paciente eliminado de forma exitosa.',
            'success'
          );
          });
        });
      }
    });
  }
}
