import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { StorageService } from "src/app/services/storage.service";

@Component({
   selector: "app-maquina-config",
   templateUrl: "./maquina-config.page.html",
   styleUrls: ["./maquina-config.page.scss"],
})
export class MaquinaConfigPage implements OnInit {
   ngOnInit() {}

   key = "";
   value = "";

   items: { key: string; value: string }[] = [];

   constructor(
      private toastController: ToastController,
      private storageService: StorageService,
   ) {}

   ionViewWillEnter() {
      this.loadItems();
   }

   addItem() {
      if (!this.key || !this.value) {
         this.showToast("Ingrese clave y valor", "warning");
         return;
      }

      this.saveItems();

      this.key = "";
      this.value = "";

      this.showToast("Item agregado", "success");
   }

   async saveItems() {
      await this.storageService.set(this.key, this.value);
      await this.loadItems();
      this.key = "";
      this.value = "";
   }

   copyKeyName(key: string, value: string = "") {
      this.key = key;
      this.value = value;
   }

   async loadItems() {
      let temData = [];
      const maquina = {
         key: "MAQUINA_ID",
         value: await this.storageService.get("MAQUINA_ID"),
      };

      const localHost = {
         key: "LOCAL_HOST",
         value: await this.storageService.get("LOCAL_HOST"),
      };

      temData.push(maquina, localHost);

      this.items = temData;
   }

   async showToast(message: string, color: string) {
      const toast = await this.toastController.create({
         message,
         duration: 1500,
         color,
         position: "bottom",
      });
      await toast.present();
   }
}
