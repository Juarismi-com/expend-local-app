import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DispenserListPageRoutingModule } from './dispenser-list-routing.module';

import { DispenserListPage } from './dispenser-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DispenserListPageRoutingModule
  ],
  declarations: [DispenserListPage]
})
export class DispenserListPageModule {}
