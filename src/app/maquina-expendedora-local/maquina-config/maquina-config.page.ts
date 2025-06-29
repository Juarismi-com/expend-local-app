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

      //this.saveItems();

      this.key = "";
      this.value = "";

      this.showToast("Item agregado", "success");
   }

   async saveItems() {
      await this.storageService.set(this.key, this.value);
      await this.loadItems();
   }

   async loadItems() {
      //const data = await this.storageService.getAll();
      //this.items = data;
      //console.log(data);
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
