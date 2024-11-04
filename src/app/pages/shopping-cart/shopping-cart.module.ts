import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PipeModule } from "src/app/pipes/pipe/pipe.module";
import { IonicModule } from "@ionic/angular";
import { ShoppingCartPageRoutingModule } from "./shopping-cart-routing.module";
import { ShoppingCartPage } from "./shopping-cart.page";

@NgModule({
   imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      ShoppingCartPageRoutingModule,
      PipeModule,
   ],
   declarations: [ShoppingCartPage],
})
export class ShoppingCartPageModule {}
