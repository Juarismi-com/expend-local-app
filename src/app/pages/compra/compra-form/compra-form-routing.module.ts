import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompraFormPage } from './compra-form.page';

const routes: Routes = [
  {
    path: '',
    component: CompraFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompraFormPageRoutingModule {}
