import { Component, Input, OnChanges } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { StorageService } from "./services/storage.service";
import { TokenService } from "./services/auth/token.service";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { MeService } from "./services/auth/me.service";
import { Subscription } from "rxjs";

@Component({
   selector: "app-root",
   templateUrl: "app.component.html",
   styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnChanges {
   public storageSub: Subscription | undefined;
   @Input()
   public usuario: any = null;

   public appPages = [
      { title: "Inicio", url: "/dashboard/dashboard-vendedor", icon: "albums" },
      { title: "Preventas", url: "/preventa-list", icon: "checkmark-done" },
      { title: "Proveedores", url: "/proveedor-detail", icon: "paper-plane" },
      { title: "Acerca de la App", url: "/about-us", icon: "paper-plane" },
      //{ title: 'Clientes', url: '/cliente-list', icon: 'paper-plane' },
      //{ title: 'Preventas List', url: '/preventa-list', icon: 'checkmark-done' },
      //{ title: 'Ventas (inactivo)', url: '/preventa-form-2', icon: 'checkmark-done' },
      //{ title: 'Compras (inactivo)', url: '/preventa-form-3', icon: 'checkmark-done' },
      //{ title: 'Clientes (inactivo)', url: '/preventa-form-4', icon: 'checkmark-done' },
      //{ title: 'Proveedores (inactivo)', url: '/preventa-form-5', icon: 'checkmark-done' },
      //{ title: 'Mi cuenta (inactivo)', url: '/preventa-form-6', icon: 'person' },

      /*{ title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },*/
   ];
   public labels = [];
   constructor(
      private storage: Storage,
      private storageService: StorageService,
      private tokenService: TokenService,
      private router: Router,
      private menu: MenuController,
      private meService: MeService,
   ) {}

   async ngOnInit() {
      // If using a custom driver:
      // await this.storage.defineDriver(MyCustomDriver)
      await this.storage.create();

      this.storageSub = this.storageService.watchStorage().subscribe(() => {
         this.getUserData();
      });
      this.getUserData();
   }

   ngOnDestroy(): void {
      if (this.storageSub) this.storageSub.unsubscribe();
   }

   ngOnChanges(changes: any) {
      console.log(changes);
   }

   async getUserData() {
      this.usuario = await this.meService.me();
   }

   async closeSession() {
      await this.storageService.remove("usuario");
      this.usuario = null;
      this.tokenService.removeToken();

      await this.menu.close();
      this.router.navigate(["/login"]);
   }
}
