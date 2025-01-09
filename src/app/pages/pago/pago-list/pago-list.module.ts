import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagoListPageRoutingModule } from './pago-list-routing.module';

import { PagoListPage } from './pago-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagoListPageRoutingModule
  ],
  declarations: [PagoListPage]
})
export class PagoListPageModule {}
