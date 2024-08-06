import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreventaDetailPageRoutingModule } from './preventa-detail-routing.module';

import { PreventaDetailPage } from './preventa-detail.page';
import { PipeModule } from 'src/app/pipes/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreventaDetailPageRoutingModule,
    PipeModule
  ],
  declarations: [PreventaDetailPage]
})
export class PreventaDetailPageModule {}
