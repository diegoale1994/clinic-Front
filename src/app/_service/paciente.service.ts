import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Paciente } from '../_model/paciente';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  pacienteCambio = new Subject<Paciente[]>();
  mensajeCambio = new Subject<string>();
  private url = `${environment.URL_HOST}/pacientes`;
  constructor(private http: HttpClient) { }

  listar(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.url}`);
  }

  listarPorId(idPaciente: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.url}/${idPaciente}`);
  }

  registrar(paciente: Paciente) {
    return this.http.post(`${this.url}`, paciente);
  }

  actualizar(paciente: Paciente) {
    return this.http.put(`${this.url}`, paciente);
  }

  eliminar(idPaciente: number) {
    return this.http.delete(`${this.url}/${idPaciente}`);
  }
}
