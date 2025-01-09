import { Component, OnInit } from "@angular/core";
import { ProductoService } from "src/app/services/producto.service";

@Component({
   selector: "app-producto-list",
   templateUrl: "./producto-list.page.html",
   styleUrls: ["./producto-list.page.scss"],
})
export class ProductoListPage implements OnInit {
   public results: any[] = [];

   constructor(private productoService: ProductoService) {}

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
}
