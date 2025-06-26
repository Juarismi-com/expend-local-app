import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaquinaConfigPage } from './maquina-config.page';

const routes: Routes = [
  {
    path: '',
    component: MaquinaConfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaquinaConfigPageRoutingModule {}
