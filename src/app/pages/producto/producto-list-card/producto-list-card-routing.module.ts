import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductoListCardPage } from './producto-list-card.page';

const routes: Routes = [
  {
    path: '',
    component: ProductoListCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoListCardPageRoutingModule {}
