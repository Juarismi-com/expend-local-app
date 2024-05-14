import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreventaFormPageRoutingModule } from './preventa-form-routing.module';

import { PreventaFormPage } from './preventa-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PreventaFormPageRoutingModule
  ],
  declarations: [PreventaFormPage]
})
export class PreventaFormPageModule {}
