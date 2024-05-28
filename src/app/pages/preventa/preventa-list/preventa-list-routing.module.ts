import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreventaListPage } from './preventa-list.page';

const routes: Routes = [
  {
    path: '',
    component: PreventaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreventaListPageRoutingModule {}
