import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { Medico } from 'src/app/_model/medico';
import { MedicoService } from '../../_service/medico.service';
import { MedicoDialogoComponent } from './medico-dialogo/medico-dialogo.component';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  dataSource: MatTableDataSource<Medico>;
  displayedColumns = ['idMedico', 'nombres', 'apellidos', 'cmp', 'acciones'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  cantidad: number;
  constructor(private medicoService: MedicoService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.medicoService.medicoCambio.subscribe((medicos: Medico[]) => {
      this.dataSource = new MatTableDataSource(medicos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cantidad = medicos.length;
    });

    this.medicoService.mensajeCambio.subscribe((mensaje) => {
      this.snackBar.open(mensaje, 'Cerrar', {
        duration: 2000,
      });
    });
    this.paginator._intl.itemsPerPageLabel = 'items por pagina';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Atras';
    this.medicoService.listar().subscribe(medicos => {
      this.dataSource = new MatTableDataSource(medicos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cantidad = medicos.length;
    });
  }

  applyFilter(texto: string) {
    this.dataSource.filter = texto.trim().toLowerCase();
  }

  openDialog(medico?: Medico): void {
    const med = medico != null ? medico : new Medico();
    this.dialog.open(MedicoDialogoComponent, {
      width: '400px',
      data: med
    });
}

eliminar(medico: Medico) {
  this.medicoService.eliminar(medico.idMedico).subscribe(() => {
    this.medicoService.listar().subscribe(medicos => {
      this.medicoService.medicoCambio.next(medicos);
      this.medicoService.mensajeCambio.next('Se Elimino !');
    });
  });
}
}
