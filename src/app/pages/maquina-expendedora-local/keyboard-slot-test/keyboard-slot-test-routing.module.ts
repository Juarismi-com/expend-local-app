import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeyboardSlotTestPage } from './keyboard-slot-test.page';

const routes: Routes = [
  {
    path: '',
    component: KeyboardSlotTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeyboardSlotTestPageRoutingModule {}
