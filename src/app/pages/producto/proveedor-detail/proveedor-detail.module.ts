import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProveedorDetailPageRoutingModule } from './proveedor-detail-routing.module';

import { ProveedorDetailPage } from './proveedor-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProveedorDetailPageRoutingModule
  ],
  declarations: [ProveedorDetailPage]
})
export class ProveedorDetailPageModule {}
