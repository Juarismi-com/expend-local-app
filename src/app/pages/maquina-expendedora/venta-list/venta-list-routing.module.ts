import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentaListPage } from './venta-list.page';

const routes: Routes = [
  {
    path: '',
    component: VentaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentaListPageRoutingModule {}
