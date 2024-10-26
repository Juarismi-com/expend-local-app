import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CompraFormPageRoutingModule } from "./compra-form-routing.module";
import { CompraFormPage } from "./compra-form.page";
import { PipeModule } from "src/app/pipes/pipe/pipe.module";

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      ReactiveFormsModule,
      CompraFormPageRoutingModule,
      PipeModule,
   ],
   declarations: [CompraFormPage],
})
export class CompraFormPageModule {}
