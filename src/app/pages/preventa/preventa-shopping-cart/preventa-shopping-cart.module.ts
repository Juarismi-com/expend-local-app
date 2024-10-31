import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { PipeModule } from "src/app/pipes/pipe/pipe.module";
import { PreventaShoppingCartPageRoutingModule } from "./preventa-shopping-cart-routing.module";
import { PreventaShoppingCartPage } from "./preventa-shopping-cart.page";

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      PreventaShoppingCartPageRoutingModule,
      PipeModule,
   ],
   declarations: [PreventaShoppingCartPage],
})
export class PreventaShoppingCartPageModule {}
