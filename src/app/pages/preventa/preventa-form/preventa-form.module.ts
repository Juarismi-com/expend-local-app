import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreventaFormPageRoutingModule } from './preventa-form-routing.module';

import { PreventaFormPage } from './preventa-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreventaFormPageRoutingModule
  ],
  declarations: [PreventaFormPage]
})
export class PreventaFormPageModule {}
