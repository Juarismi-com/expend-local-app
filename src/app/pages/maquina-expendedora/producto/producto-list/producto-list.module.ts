import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProductoListPageRoutingModule } from "./producto-list-routing.module";

import { ProductoListPage } from "./producto-list.page";
import { ProductoFormModalComponent } from "src/app/components/maquina-expendedora/producto-form-modal/producto-form-modal.component";

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      ProductoListPageRoutingModule,
      ReactiveFormsModule,
   ],
   declarations: [ProductoListPage, ProductoFormModalComponent],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductoListPageModule {}
