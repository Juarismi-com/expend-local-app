import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeoSimplePageRoutingModule } from './geo-simple-routing.module';

import { GeoSimplePage } from './geo-simple.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeoSimplePageRoutingModule
  ],
  declarations: [GeoSimplePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeoSimplePageModule {}
