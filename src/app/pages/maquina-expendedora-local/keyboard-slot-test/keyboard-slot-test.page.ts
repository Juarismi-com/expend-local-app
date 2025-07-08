import { Component, OnInit } from "@angular/core";
import { ToastController, AlertController } from "@ionic/angular";
import axios from "axios";
import { StorageService } from "src/app/services/storage.service";
import { VentaService } from "src/app/services/venta.service.service";

@Component({
   selector: "app-keyboard-slot-test",
   templateUrl: "./keyboard-slot-test.page.html",
   styleUrls: ["./keyboard-slot-test.page.scss"],
})
export class KeyboardSlotTestPage implements OnInit {
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

   async slotTest(slotNum: any) {
      try {
         const localHost = await this.storageService.get("LOCAL_HOST");

         const res = await axios.get(`${localHost}/slots/${slotNum}`);
         console.log(res);
      } catch (error: any) {
         alert(JSON.stringify(error));
         await this.showToast(JSON.stringify(error), "danger");
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
               text: "Probar slot",
               handler: async () => await this.slotTest(slotNum),
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
