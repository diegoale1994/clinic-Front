import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Especialidad } from 'src/app/_model/especialidad';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  public especialidadCambio = new Subject<Especialidad[]>();
  public mensajeCambio = new Subject<string>();
  private url = `${environment.URL_HOST}/especialidades`;
  constructor(private http: HttpClient) { }

  listar(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(`${this.url}`);
  }

  listarPorId(idEspecialidad: string): Observable<Especialidad> {
    return this.http.get<Especialidad>(`${this.url}/${idEspecialidad}`);
  }

  registrar(especialidad: Especialidad) {
    return this.http.post(`${this.url}`, especialidad);
  }

  actualizar(especialidad: Especialidad) {
    return this.http.put(`${this.url}`, especialidad);
  }

  eliminar(idEspecialidad: number) {
    return this.http.delete(`${this.url}/${idEspecialidad}`);
  }
}
