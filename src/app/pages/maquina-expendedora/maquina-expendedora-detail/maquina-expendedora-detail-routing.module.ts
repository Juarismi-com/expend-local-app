import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaquinaExpendedoraDetailPage } from './maquina-expendedora-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MaquinaExpendedoraDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaquinaExpendedoraDetailPageRoutingModule {}
