import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTableModule,
  MatToolbarModule,
  MatInputModule,
  MatCardModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule
} from '@angular/material';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule
  ],
  exports: [
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
