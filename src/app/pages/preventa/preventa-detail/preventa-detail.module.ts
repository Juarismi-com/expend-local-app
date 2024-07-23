import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreventaDetailPageRoutingModule } from './preventa-detail-routing.module';

import { PreventaDetailPage } from './preventa-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreventaDetailPageRoutingModule
  ],
  declarations: [PreventaDetailPage]
})
export class PreventaDetailPageModule {}
