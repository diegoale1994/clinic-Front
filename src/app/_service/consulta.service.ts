import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ConsultaListaExamenDTO } from '../_model/consultaListaExamenDTO';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  url = `${environment.URL_HOST}/consultas`;
  constructor(private http: HttpClient) { }

  registrar(consultaDTO: ConsultaListaExamenDTO) {
    return this.http.post(this.url, consultaDTO);
  }
}
