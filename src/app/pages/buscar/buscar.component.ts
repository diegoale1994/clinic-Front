import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { FiltroConsulta } from '../../_model/filtroConsulta';
import { Consulta } from 'src/app/_model/consulta';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { DialogoDetalleComponent } from './dialogo-detalle/dialogo-detalle.component';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  form: FormGroup;
  dataSource: MatTableDataSource<Consulta>;
  displayedColumns = ['paciente', 'medico', 'especialidad', 'fecha', 'acciones'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private consultaService: ConsultaService, public dialog: MatDialog) { }

  ngOnInit() {
    this.form = new FormGroup({
      dni: new FormControl(''),
      nombreCompleto: new FormControl(''),
      fechaConsulta: new FormControl('')
    });
  }

  buscar() {
    let filtro = new FiltroConsulta(this.form.value.dni, this.form.value.nombreCompleto.toLowerCase(), this.form.value.fechaConsulta);
    if (filtro.fechaConsulta) {
      filtro.fechaConsulta.setHours(0);
      filtro.fechaConsulta.setMinutes(0);
      filtro.fechaConsulta.setSeconds(0);
      filtro.fechaConsulta.setMilliseconds(0);
      delete filtro.dni;
      delete filtro.nombreCompleto;
      this.ejecutarFiltro(filtro);
    } else {
      delete filtro.fechaConsulta;
      if (filtro.dni.length === 0) {
        delete filtro.dni;
      }
      if (filtro.nombreCompleto.length === 0) {
        delete filtro.nombreCompleto;
      }
      this.ejecutarFiltro(filtro);
    }
  }

  ejecutarFiltro(filtro: FiltroConsulta) {
    this.consultaService.filtrar(filtro).subscribe((response: Consulta[]) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  verDetalle(consulta: Consulta) {
    console.log(consulta);
    this.dialog.open(DialogoDetalleComponent, {
      width: '800px',
      data: consulta
    });
  }
}
