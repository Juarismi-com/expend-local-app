import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeoSimplePage } from './geo-simple.page';

const routes: Routes = [
  {
    path: '',
    component: GeoSimplePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeoSimplePageRoutingModule {}
