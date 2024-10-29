import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoListCardPageRoutingModule } from './producto-list-card-routing.module';

import { ProductoListCardPage } from './producto-list-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoListCardPageRoutingModule
  ],
  declarations: [ProductoListCardPage]
})
export class ProductoListCardPageModule {}
