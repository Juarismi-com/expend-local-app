import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaquinaConfigPageRoutingModule } from './maquina-config-routing.module';

import { MaquinaConfigPage } from './maquina-config.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaquinaConfigPageRoutingModule
  ],
  declarations: [MaquinaConfigPage]
})
export class MaquinaConfigPageModule {}
