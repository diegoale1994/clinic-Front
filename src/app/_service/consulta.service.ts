import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ConsultaListaExamenDTO } from '../_model/consultaListaExamenDTO';
import { FiltroConsulta } from '../_model/filtroConsulta';
import { Consulta } from '../_model/consulta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  url = `${environment.URL_HOST}/consultas`;
  constructor(private http: HttpClient) { }

  registrar(consultaDTO: ConsultaListaExamenDTO) {
    return this.http.post(this.url, consultaDTO);
  }

  filtrar(filtroConsulta: FiltroConsulta): Observable<Consulta[]> {
    return this.http.post<Consulta[]>(`${this.url}/buscar`, filtroConsulta);
  }
}
