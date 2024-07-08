import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreventaListPageRoutingModule } from './preventa-list-routing.module';

import { PreventaListPage } from './preventa-list.page';
import { PipeModule } from 'src/app/pipes/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreventaListPageRoutingModule,
    PipeModule
  ],
  declarations: [
    PreventaListPage,
  ]
})
export class PreventaListPageModule {}
