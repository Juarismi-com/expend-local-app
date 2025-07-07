import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeyboardSlotTestPageRoutingModule } from './keyboard-slot-test-routing.module';

import { KeyboardSlotTestPage } from './keyboard-slot-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KeyboardSlotTestPageRoutingModule
  ],
  declarations: [KeyboardSlotTestPage]
})
export class KeyboardSlotTestPageModule {}
