import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { ProductoService } from "src/app/services/producto.service";
import { ProductoFormModalComponent } from "src/app/components/producto/producto-form-modal/producto-form-modal.component";
import { ShoppingCartListComponent } from "src/app/components/shopping-cart/shopping-cart-list/shopping-cart-list.component";

@Component({
   selector: "app-producto-list-card",
   templateUrl: "./producto-list-card.page.html",
   styleUrls: ["./producto-list-card.page.scss"],
})
export class ProductoListCardPage implements OnInit {
   public results: any[] = [];
   productos: any[] = [];
   productosSeleccionados: any[] = [];
   sumTotal = 0;
   public variantByCantSelected: any = null;

   constructor(
      private productoService: ProductoService,
      private modalController: ModalController,
      private router: Router,
   ) {}

   async ngOnInit() {
      this.results = await this.productoService.getProducts();
   }

   async handleInput(e: any) {
      const value = e.target.value.toLowerCase();
      this.results = await this.productoService.searchProduct(value);
   }

   async selectProduct(producto: any) {
      const prices = this.productoService.setListOfPrices(producto);
      const precio = prices[1]?.precio || producto.precio;
      const descuento = prices[1]?.descuento;

      const modal = await this.modalController.create({
         component: ProductoFormModalComponent,
         componentProps: {
            producto: {
               ...producto,
               producto_id: producto.id,
               precio_unitario: precio,
               cantidad: 1,
               descuento,
               subtotal: precio * 1,
               precio_lista: prices,
            },
         },
      });

      modal.onDidDismiss().then(({ data }) => {
         if (data) {
            this.productosSeleccionados.push(data);
         }
      });
      await modal.present();
   }

   async openShoppingCartModal() {
      const nuevoModal = await this.modalController.create({
         component: ShoppingCartListComponent,
         componentProps: {
            productos: this.productosSeleccionados,
         },
      });
      await nuevoModal.present();
   }
}
