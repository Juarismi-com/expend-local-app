import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagoListPage } from './pago-list.page';

const routes: Routes = [
  {
    path: '',
    component: PagoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagoListPageRoutingModule {}
