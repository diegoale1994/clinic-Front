import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { EspecialComponent } from './pages/consulta/especial/especial.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { ReporteComponent } from './pages/reporte/reporte.component';

const routes: Routes = [
  {path: 'paciente', component: PacienteComponent, children: [
    {path: 'nuevo', component: PacienteEdicionComponent},
    {path: 'edicion/:id', component: PacienteEdicionComponent}
  ],
},
{path: 'medico', component: MedicoComponent},
{path: 'consulta', component: ConsultaComponent},
{path: 'reporte', component: ReporteComponent},
{path: 'buscar', component: BuscarComponent},
{path: 'consulta-especial', component: EspecialComponent},
{path: 'especialidad', component: EspecialidadComponent, children: [
  {path: 'nuevo', component: EspecialidadEdicionComponent},
  {path: 'edicion/:id', component: EspecialidadEdicionComponent}
]},
{path: 'examen', component: ExamenComponent, children: [
  {path: 'nuevo', component: ExamenEdicionComponent},
  {path: 'edicion/:id', component: ExamenEdicionComponent}
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
