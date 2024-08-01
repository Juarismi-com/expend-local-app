import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProveedorDetailPage } from './proveedor-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ProveedorDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProveedorDetailPageRoutingModule {}
