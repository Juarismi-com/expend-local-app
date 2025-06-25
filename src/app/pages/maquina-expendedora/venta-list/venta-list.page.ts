import { Component, OnInit } from "@angular/core";
import { VentaServiceService } from "src/app/services/venta.service.service";

@Component({
   selector: "app-venta-list",
   templateUrl: "./venta-list.page.html",
   styleUrls: ["./venta-list.page.scss"],
})
export class VentaListPage implements OnInit {
   ventas: any[] = [];

   constructor(private ventaService: VentaServiceService) {}

   async ngOnInit() {
      this.ventas = await this.ventaService.getVentas();
   }
}
