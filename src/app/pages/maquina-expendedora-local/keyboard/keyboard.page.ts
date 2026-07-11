import { Component, OnInit } from "@angular/core";
import {
   ToastController,
   AlertController,
   LoadingController,
} from "@ionic/angular";
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
      private loadingController: LoadingController,
      private ventaService: VentaService,
      private storageService: StorageService,
   ) {}

   ngOnInit() {}

   activeField: string | null = null;
   displayValue = "";
   resultPreventa: any;
   isProcesandoPago = false;

   keys: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

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

   async createVenta(metodoPago: String, slotNum: any) {
      if (this.isProcesandoPago) return;
      this.isProcesandoPago = true;

      const loading = await this.loadingController.create({
         message: "Revise su POS...",
         backdropDismiss: false,
      });
      await loading.present();

      try {
         const maquinaHost = await this.storageService.get("MACHINE_HOST");
         const maquina_id = await this.storageService.get("MAQUINA_ID");

         if (!maquina_id) throw "Maquina no esta disponible";
         if (!maquinaHost) throw "HOST LOCAL no esta disponible";

         // Genera la primera venta
         const res: any = await this.ventaService.createVenta({
            maquina_id,
            slot_num: parseInt(slotNum),
         });

         // con la forma de pago si selecciono qr, solo se espera a lo que
         // retorne
         const venta_id = res?.data?.id;
         let resPos: any;
         if (metodoPago == "QR") {
            resPos = await axios.patch(`${maquinaHost}/vending/${venta_id}/qr`);
         } else {
            resPos = await axios.patch(`${maquinaHost}/vending/${venta_id}/ux`);
         }

         if (resPos.data?.bancard_status >= 400) {
            throw resPos.data?.message;
         }

         console.log(resPos?.data?.bancard_status);
         console.log(resPos);
         await this.showToast("Pago procesado correctamente", "success");
      } catch (error: any) {
         console.log(error);
         await this.showToast(
            error?.message || error || "No se pudo realizar la venta",
            "danger",
         );
      } finally {
         await loading.dismiss();
         this.isProcesandoPago = false;
      }
   }

   onBackspace() {
      if (this.displayValue.length > 0) {
         this.displayValue = this.displayValue.slice(0, -1);
      }
   }

   async onEnter() {
      if (!this.displayValue) {
         await this.showToast("Ingrese un valor primero", "warning");
         return;
      }

      if (this.displayValue.length > 2) {
         await this.showToast(
            "Ingrese un valor en el rango permitido",
            "warning",
         );
         this.displayValue = "";
         return;
      }

      const slotNum = this.displayValue;

      const alert = await this.alertController.create({
         header: "Confirmar su metodo de pago",
         message: `¿Seleccione su forma de pago, slot seleccionado ${this.displayValue}?`,
         buttons: [
            {
               text: "Cancelar",
               role: "cancel",
            },
            {
               text: "QR",
               handler: async () => await this.createVenta("QR", slotNum),
            },
            {
               text: "Tarjeta Credito/Debito",
               handler: async () => await this.createVenta("TARJETA", slotNum),
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
         this.keys.slice(0, 3), // 1 2 3
         this.keys.slice(3, 6), // 4 5 6
         this.keys.slice(6, 9), // 7 8 9
         //this.keys.slice(9), // 0
      ];
   }
}
