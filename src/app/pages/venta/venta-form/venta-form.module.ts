import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { VentaFormPageRoutingModule } from "./venta-form-routing.module";

import { VentaFormPage } from "./venta-form.page";
import { PipeModule } from "src/app/pipes/pipe/pipe.module";

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      ReactiveFormsModule,
      VentaFormPageRoutingModule,
      PipeModule,
   ],
   declarations: [VentaFormPage],
})
export class VentaFormPageModule {}
