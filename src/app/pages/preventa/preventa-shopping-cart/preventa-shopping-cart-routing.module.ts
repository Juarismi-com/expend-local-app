import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreventaShoppingCartPage } from './preventa-shopping-cart.page';

const routes: Routes = [
  {
    path: '',
    component: PreventaShoppingCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreventaShoppingCartPageRoutingModule {}
