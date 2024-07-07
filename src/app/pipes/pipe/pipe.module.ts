import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatCustomPipe } from '../number/format-custom.pipe';

@NgModule({
  declarations: [
    FormatCustomPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormatCustomPipe
  ]
})
export class PipeModule { }
