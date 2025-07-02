import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ProductoFormModalComponent } from "src/app/components/maquina-expendedora/producto-form-modal/producto-form-modal.component";
import { ProductoService } from "src/app/services/producto.service";

@Component({
   selector: "app-producto-list",
   templateUrl: "./producto-list.page.html",
   styleUrls: ["./producto-list.page.scss"],
})
export class ProductoListPage implements OnInit {
   public results: any[] = [];

   constructor(
      private productoService: ProductoService,
      private modalCtrl: ModalController,
   ) {}

   async ngOnInit() {
      try {
         this.results = await this.productoService.getProducts();
      } catch (error) {
         console.error("Error al cargar productos:", error);
         this.results = [];
      }
   }

   async handleInput(e: any) {
      const value = e.target.value.toLowerCase();
      this.results = await this.productoService.searchProduct(value);
   }

   async openProductoFormModal() {
      const modal = await this.modalCtrl.create({
         component: ProductoFormModalComponent,
      });
      await modal.present();

      // Captura el resultado al cerrar el modal (opcional)

      const { data } = await modal.onDidDismiss();
      if (data?.result) {
         this.results = await this.productoService.getProducts();
      }
      console.log("Datos recibidos:", data);
   }
}
