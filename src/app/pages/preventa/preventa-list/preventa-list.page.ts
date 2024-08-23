import { Component, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { StorageService } from "src/app/services/storage.service";
import { PreventaService } from "src/app/services/preventa.service";
import { Subscription } from "rxjs";
import { MeService } from "src/app/services/auth/me.service";
import { VendedorTableModalComponent } from "src/app/components/vendedor/vendedor-table-modal/vendedor-table-modal.component";

@Component({
   selector: "app-preventa-list",
   templateUrl: "./preventa-list.page.html",
   styleUrls: ["./preventa-list.page.scss"],
})
export class PreventaListPage {
   public storageSub: Subscription | undefined;
   @Input()
   public usuario: any = null;

   public preventaList: any[] = [];

   constructor(
      private modalController: ModalController,
      private storageService: StorageService,
      private preventaService: PreventaService,
      private meService: MeService,
   ) {}

   async ngOnInit() {
      this.storageSub = this.storageService
         .watchStorage()
         .subscribe(async () => {
            this.usuario = await this.meService.me();
         });
   }

   ionViewWillEnter() {
      this.getPreventaByVendedorId();
   }

   async handleInputSearch(e: any) {
      const value = e.target.value.toLowerCase();
      this.preventaList = await this.preventaService.searchPreventa(value);
   }

   editPreventa(preventa: any) {
      console.log("editPreventa");
      // @todo should view the preventa-form modal with data
   }

   async getPreventaByVendedorId() {
      const vendedorId: any = await this.meService.getVendedor();

      if (vendedorId) {
         this.preventaList = await this.preventaService.getPreventaByVendedorId(
            vendedorId,
         );
      }
   }

   async openVendedorTableModal() {
      const modal = await this.modalController.create({
         component: VendedorTableModalComponent,
      });

      modal.onDidDismiss().then(async ({ data }) => {
         const vendedor = data;
         if (vendedor) {
            this.preventaList =
               await this.preventaService.getPreventaByVendedorId(vendedor?.id);
         }
      });
      await modal.present();
   }
}
