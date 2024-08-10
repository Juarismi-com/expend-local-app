import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProveedorDetailPageRoutingModule } from './proveedor-detail-routing.module';

import { ProveedorDetailPage } from './proveedor-detail.page';
import { PipeModule } from 'src/app/pipes/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProveedorDetailPageRoutingModule,
    PipeModule
  ],
  declarations: [ProveedorDetailPage]
})
export class ProveedorDetailPageModule {}
