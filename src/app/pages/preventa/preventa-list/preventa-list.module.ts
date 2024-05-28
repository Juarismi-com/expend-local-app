import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreventaListPageRoutingModule } from './preventa-list-routing.module';

import { PreventaListPage } from './preventa-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreventaListPageRoutingModule
  ],
  declarations: [PreventaListPage]
})
export class PreventaListPageModule {}
