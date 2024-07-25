import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreventaListPage } from './preventa-list.page';
import { PreventaDetailPage } from '../preventa-detail/preventa-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PreventaListPage,
  },
  { path: 'preventa-detail/:id', component: PreventaDetailPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreventaListPageRoutingModule {}
