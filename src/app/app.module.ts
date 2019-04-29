import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from '../../.history/src/app/material/material.module_20190429114904';
import { PacienteComponent } from './pages/paciente/paciente.component';

@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
