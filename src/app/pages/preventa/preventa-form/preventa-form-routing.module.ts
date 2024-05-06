import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreventaFormPage } from './preventa-form.page';

const routes: Routes = [
  {
    path: '',
    component: PreventaFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreventaFormPageRoutingModule {}
