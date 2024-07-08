import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreventaFormPageRoutingModule } from './preventa-form-routing.module';

import { PreventaFormPage } from './preventa-form.page';
import { PipeModule } from 'src/app/pipes/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PreventaFormPageRoutingModule,
    PipeModule
  ],
  declarations: [
    PreventaFormPage
  ]
})
export class PreventaFormPageModule {}
