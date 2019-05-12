import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTableModule,
  MatToolbarModule,
  MatInputModule,
  MatCardModule,
  MatMenuModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSelectModule,
  MatExpansionModule,
  MatSortModule,
  MatListModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatDividerModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule
} from '@angular/material';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatToolbarModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatDividerModule,
    MatCardModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule
  ],
  exports: [
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatNativeDateModule,
    MatMenuModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatDividerModule,
    MatSnackBarModule,
    MatCardModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
