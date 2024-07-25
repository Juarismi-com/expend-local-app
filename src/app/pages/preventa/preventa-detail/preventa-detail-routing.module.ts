import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreventaDetailPage } from './preventa-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PreventaDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreventaDetailPageRoutingModule {}
