import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef,  MAT_DIALOG_DATA } from '@angular/material';
import { Consulta } from 'src/app/_model/consulta';
import { ExamenService } from '../../../_service/examen.service';
import { ConsultaListaExamenDTO } from '../../../_model/consultaListaExamenDTO';

@Component({
  selector: 'app-dialogo-detalle',
  templateUrl: './dialogo-detalle.component.html',
  styleUrls: ['./dialogo-detalle.component.css']
})
export class DialogoDetalleComponent implements OnInit {
  consulta: Consulta;
  examenes: ConsultaListaExamenDTO;
  constructor(public dialogRef: MatDialogRef<DialogoDetalleComponent>,
              @Inject(MAT_DIALOG_DATA) private data: Consulta, private examenesService: ExamenService) { }

  ngOnInit() {
    this.consulta = this.data;
    this.cargarExamenes();
  }

  cargarExamenes() {
   this.examenesService.listarExamenPorConsulta(this.consulta.idConsulta).subscribe((response: ConsultaListaExamenDTO) => {
    this.examenes = response;
   });
  }

  cancelar() {
    this.dialogRef.close();
  }

}
