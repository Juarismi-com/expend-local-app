import { Component, OnInit } from "@angular/core";
import { ToastController, AlertController } from "@ionic/angular";
import axios from "axios";
import { StorageService } from "src/app/services/storage.service";
import { VentaService } from "src/app/services/venta.service.service";

@Component({
   selector: "app-keyboard",
   templateUrl: "./keyboard.page.html",
   styleUrls: ["./keyboard.page.scss"],
})
export class KeyboardPage implements OnInit {
   constructor(
      private toastController: ToastController,
      private alertController: AlertController,
      private ventaService: VentaService,
      private storageService: StorageService,
   ) {}

   ngOnInit() {}

   activeField: string | null = null;
   displayValue = "";
   resultPreventa: any;

   keys: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

   setActiveField(field: string) {
      this.activeField = field;
   }

   handleKey(key: string) {
      if (key === "Backspace") {
         this.onBackspace();
      } else if (key === "Enter") {
         this.onEnter();
      } else {
         this.addCharacter(key);
      }
   }

   addCharacter(char: string) {
      this.displayValue += char;
   }

   onBackspace() {
      if (this.displayValue.length > 0) {
         this.displayValue = this.displayValue.slice(0, -1);
      }
   }

   async onEnter() {
      console.log("Número ingresado:", this.displayValue);
      // no se ingreso datao
      if (!this.displayValue) {
         await this.showToast("Ingrese un valor primero", "warning");
         return;
      }

      const slotNum = this.displayValue;

      const alert = await this.alertController.create({
         header: "Confirmar",
         message: `¿Desea continuar con el slot: ${this.displayValue}?`,
         buttons: [
            {
               text: "Cancelar",
               role: "cancel",
            },
            {
               text: "Aceptar",
               handler: async () => {
                  try {
                     const resultPreventa = await this.ventaService.createVenta(
                        {
                           maquina_id: "87c082c9-470c-44b2-af8d-1d89dabe5071",
                           slot_num: parseInt(slotNum),
                        },
                     );

                     const config: any = resultPreventa.config;
                     const localHost = await this.storageService.get(
                        "local_ip",
                     );

                     const { file, columna } = config;

                     const resultVenta = axios.patch(
                        `http://${localHost}:5001/${resultPreventa?.id}/qr`,
                     );

                     console.log(resultVenta);

                     await this.showToast(
                        "Por favor visualice el POS",
                        "success",
                     );
                  } catch (error) {
                     await this.showToast("No se dispone de stock", "danger");
                  }
               },
            },
         ],
      });

      await alert.present();

      this.displayValue = "";
   }

   async showToast(message: string, color: string) {
      const toast = await this.toastController.create({
         message,
         duration: 2000,
         color,
         position: "bottom",
      });
      await toast.present();
   }

   getRows() {
      return [
         this.keys.slice(0, 3),
         this.keys.slice(3, 6),
         this.keys.slice(6, 9),
      ];
   }
}
