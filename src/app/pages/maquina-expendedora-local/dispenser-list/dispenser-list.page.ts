import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { DispenserService } from "src/app/services/dispenser.service";

@Component({
   selector: "app-dispenser-list",
   templateUrl: "./dispenser-list.page.html",
   styleUrls: ["./dispenser-list.page.scss"],
})
export class DispenserListPage {
   constructor(
      private dispenserService: DispenserService,
      private alertController: AlertController,
   ) {}

   confirmOption(option: any, type = "ux") {
      if (option == 1) {
         this.dispenserService.paymentWithBancard(type, {
            option,
            precio: 100,
            metodo_pago: type,
         });
      } else {
         this.dispenserService.paymentWithBancard(type, {
            option,
            precio: 120,
            metodo_pago: type,
         });
      }
   }

   async selectOption(option = 1) {
      const alert = await this.alertController.create({
         header: "Confirmar su metodo de pago",
         message: `¿Seleccione su forma de pago?`,
         buttons: [
            {
               text: "Cancelar",
               role: "cancel",
            },
            {
               text: "QR",
               handler: async () => await this.confirmOption(option, "qr"),
            },
            {
               text: "Tarjeta Credito/Debito",
               handler: async () => await this.confirmOption(option, "ux"),
            },
         ],
      });

      await alert.present();
   }
}
