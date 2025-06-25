import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MaquinaExpendedoraDetailPageRoutingModule } from "./maquina-expendedora-detail-routing.module";

import { MaquinaExpendedoraDetailPage } from "./maquina-expendedora-detail.page";
import { SlotCrudComponent } from "src/app/components/maquina-expendedora/slot-crud/slot-crud.component";

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      MaquinaExpendedoraDetailPageRoutingModule,
      ReactiveFormsModule,
   ],
   declarations: [MaquinaExpendedoraDetailPage, SlotCrudComponent],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MaquinaExpendedoraDetailPageModule {}
