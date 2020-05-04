import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatInputModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatRadioModule,
    MatInputModule
  ]
})

export class MaterialModule { }
