import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatGridListModule,
  MatListModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatExpansionModule,
  MatTableModule,
  MatCardModule,
  MatDividerModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatIconModule,
  MatDialogModule,
  MatSelectModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
const module = [
  MatButtonModule,
  MatCheckboxModule,
  MatGridListModule,
  MatListModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatExpansionModule,
  MatTableModule,
  MatCardModule,
  MatDividerModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatIconModule,
  MatDialogModule,
  MatSelectModule,
  MatProgressBarModule
];
@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ...module,
  ],
  exports: [
    ...module
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]
})
export class MaterialModule { }
