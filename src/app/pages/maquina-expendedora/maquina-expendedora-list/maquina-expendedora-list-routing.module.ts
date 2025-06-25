import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaquinaExpendedoraListPage } from './maquina-expendedora-list.page';

const routes: Routes = [
  {
    path: '',
    component: MaquinaExpendedoraListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaquinaExpendedoraListPageRoutingModule {}
