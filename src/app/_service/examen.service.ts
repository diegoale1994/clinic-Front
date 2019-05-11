import { Injectable } from '@angular/core';
import { Examen } from '../_model/examen';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  examenCambio = new Subject<Examen[]>();
  mensajeCambio = new Subject<string>();
  private url = `${environment.URL_HOST}/examenes`;
  constructor(private http: HttpClient) { }

  listar(): Observable<Examen[]> {
    return this.http.get<Examen[]>(`${this.url}`);
  }

  listarPorId(idExamen: string): Observable<Examen> {
    return this.http.get<Examen>(`${this.url}/${idExamen}`);
  }

  registrar(examen: Examen) {
    return this.http.post(`${this.url}`, examen);
  }

  actualizar(examen: Examen) {
    return this.http.put(`${this.url}`, examen);
  }

  eliminar(idExamen: number) {
    return this.http.delete(`${this.url}/${idExamen}`);
  }
}
