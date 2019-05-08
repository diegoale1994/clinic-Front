import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';

const routes: Routes = [
  {path: 'paciente', component: PacienteComponent, children: [
    {path: 'nuevo', component: PacienteEdicionComponent},
    {path: 'edicion/:id', component: PacienteEdicionComponent}
  ],
},
{path: 'medico', component: MedicoComponent},
{path: 'especialidad', component: EspecialidadComponent, children: [
  {path: 'nuevo', component: EspecialidadEdicionComponent},
  {path: 'edicion/:id', component: EspecialidadEdicionComponent}
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
