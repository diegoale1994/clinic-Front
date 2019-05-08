import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Medico } from '../_model/medico';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  public medicoCambio = new Subject<Medico[]>();
  public mensajeCambio = new Subject<string>();
  private url = `${environment.URL_HOST}/medicos`;
  constructor(private http: HttpClient) { }

  listar(): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${this.url}`);
  }

  listarPorId(idMedico: string): Observable<Medico> {
    return this.http.get<Medico>(`${this.url}/${idMedico}`);
  }

  registrar(medico: Medico) {
    return this.http.post(`${this.url}`, medico);
  }

  actualizar(medico: Medico) {
    return this.http.put(`${this.url}`, medico);
  }

  eliminar(idMedico: number) {
    return this.http.delete(`${this.url}/${idMedico}`);
  }
}
