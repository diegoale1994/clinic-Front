import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteComponent } from './pages/paciente/paciente.component';

const routes: Routes = [
  {path: 'paciente', component: PacienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
