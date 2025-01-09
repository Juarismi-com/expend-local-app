import { Component, OnInit } from "@angular/core";
import { PagoService } from "src/app/services/pago.service";

@Component({
   selector: "app-pago-list",
   templateUrl: "./pago-list.page.html",
   styleUrls: ["./pago-list.page.scss"],
})
export class PagoListPage implements OnInit {
   public results: any[] = [];

   constructor(private pagoService: PagoService) {}

   async ngOnInit() {
      try {
         this.results = await this.pagoService.getPayments();
      } catch (error) {
         console.error("Error al cargar pagos:", error);
         this.results = [];
      }
   }

   async handleInput(e: any) {
      const value = e.target.value.toLowerCase();
      this.results = await this.pagoService.searchPayment(value);
   }
}
