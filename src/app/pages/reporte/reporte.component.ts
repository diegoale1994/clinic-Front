import { Component, OnInit } from '@angular/core';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { ConsultaResumenDTO } from 'src/app/_model/ConsultaResumenDTO';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  chart: any;
  tipo: string;
  pdfSrc = '';
  constructor(private consultaService: ConsultaService) { }

  ngOnInit() {
    this.tipo = 'line';
    this.dibujar();
  }
  dibujar() {
    this.consultaService.listarResumen().subscribe((response: ConsultaResumenDTO[]) => {
      let cantidad = response.map(res => res.cantidad);
      let fechas = response.map(res => res.fecha);
      this.chart = new Chart('canvas', {
        type: this.tipo,
        data: {
          labels: fechas,
          datasets: [
            {
              label: 'Cantidad',
              data: cantidad,
              borderColor: '#3cba9f',
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ]
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }
  cambiar(tipe: string) {
    this.tipo = tipe;
    if (this.chart) {
      this.chart.destroy();
    }
    this.dibujar();
  }
  generarReporte() {
    this.consultaService.generarReporte().subscribe(response => {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };
      reader.readAsArrayBuffer(response);
    });
  }

  descargarReporte() {
    this.consultaService.generarReporte().subscribe(response => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'archivo.pdf';
      a.click();
    });
  }
}
