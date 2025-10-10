import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DispenserListPage } from './dispenser-list.page';

const routes: Routes = [
  {
    path: '',
    component: DispenserListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DispenserListPageRoutingModule {}
