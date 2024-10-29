import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProductoListCardPageRoutingModule } from "./producto-list-card-routing.module";

import { ProductoListCardPage } from "./producto-list-card.page";
import { PipeModule } from "src/app/pipes/pipe/pipe.module";

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      ProductoListCardPageRoutingModule,
      PipeModule,
   ],
   declarations: [ProductoListCardPage],
})
export class ProductoListCardPageModule {}
