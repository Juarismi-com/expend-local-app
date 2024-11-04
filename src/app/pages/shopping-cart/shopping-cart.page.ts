import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController, AlertController } from "@ionic/angular";
import { ProductoFormModalComponent } from "src/app/components/producto/producto-form-modal/producto-form-modal.component";
import { ProductoService } from "src/app/services/producto.service";

@Component({
   selector: "app-shopping-cart",
   templateUrl: "./shopping-cart.page.html",
   styleUrls: ["./shopping-cart.page.scss"],
})
export class ShoppingCartPage {
   productos: any[] = [];
   sumTotal = 0;
   segmentValue: string = "producto";

   constructor(
      private router: Router,
      private productoService: ProductoService,
      private modalController: ModalController,
      private alertController: AlertController,
   ) {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state) {
         const productosData = navigation.extras.state["productos"] || [];
         this.productos = Array.isArray(productosData)
            ? productosData
            : [productosData];
         this.sumTotal = this.productoService.setTotalOfList(this.productos);
      }
   }

   /**
    * Abre el modal con el listado de productos y al cerrar puede actualiza el detalle
    * @param producto
    */
   async openProductoFormModal(producto: any) {
      const modal = await this.modalController.create({
         component: ProductoFormModalComponent,
         componentProps: { producto },
      });

      modal.onDidDismiss().then(({ data }) => {
         const producto = data;

         if (producto) {
            this.productos = this.productoService.changeQuantityOfProduct(
               this.productos,
               producto,
            );
            this.sumTotal = this.productoService.setTotalOfList(this.productos);
         }
      });
      await modal.present();
   }

   /**
    * Elimina un detalle del producto asociado a la preventa
    * @param producto
    */
   async removeProductoDetalle(productoIndex: number) {
      const alert = await this.alertController.create({
         header: "Confirmación",
         message: `¿Desea eliminar el producto?`,
         buttons: [
            {
               text: "Cancelar",
               role: "cancel",
               cssClass: "secondary",
               handler: () => {
                  console.log("Eliminación cancelada");
               },
            },
            {
               text: "Aceptar",
               handler: () => {
                  this.productos = this.productoService.removeProductFromList(
                     this.productos,
                     productoIndex,
                  );
                  this.sumTotal = this.productoService.setTotalOfList(
                     this.productos,
                  );
               },
            },
         ],
      });
      await alert.present();
   }

   openProductListCard() {
      this.router.navigate(["/producto-list-card"]);
   }
}
