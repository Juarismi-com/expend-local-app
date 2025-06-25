import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MaquinaExpendedoraListPageRoutingModule } from "./maquina-expendedora-list-routing.module";

import { MaquinaExpendedoraListPage } from "./maquina-expendedora-list.page";

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      MaquinaExpendedoraListPageRoutingModule,
   ],
   declarations: [MaquinaExpendedoraListPage],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MaquinaExpendedoraListPageModule {}
