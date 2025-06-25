import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentaListPageRoutingModule } from './venta-list-routing.module';

import { VentaListPage } from './venta-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VentaListPageRoutingModule
  ],
  declarations: [VentaListPage]
})
export class VentaListPageModule {}
