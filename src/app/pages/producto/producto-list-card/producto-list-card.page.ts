import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { ProductoService } from "src/app/services/producto.service";

@Component({
   selector: "app-producto-list-card",
   templateUrl: "./producto-list-card.page.html",
   styleUrls: ["./producto-list-card.page.scss"],
})
export class ProductoListCardPage {
   public results: any[] = [];
   public variantByCantSelected: any = null;

   constructor(
      private productoService: ProductoService,
      private alertController: AlertController,
   ) {}

   async handleInput(e: any) {
      const value = e.target.value.toLowerCase();
      this.results = await this.productoService.searchProduct(value);
      console.log(this.results);
   }

   async viewMoreDetailsProducts(product: any) {
      const optionsProducts = product.precios.map((precio: any) => {
         return {
            type: "radio",
            label: `${precio.cantidad} x ${precio.precio_unitario}`,
            handler: (e: any) => {
               this.variantByCantSelected = JSON.stringify(e);
            },
         };
      });

      const alert = await this.alertController.create({
         header: "Precios por cantidad",
         inputs: [...optionsProducts],
         buttons: [
            {
               text: "Salir",
            },
         ],
      });

      await alert.present();
   }
}
