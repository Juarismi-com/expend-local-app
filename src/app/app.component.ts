import { Component, Input, OnChanges } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { StorageService } from "./services/storage.service";
import { TokenService } from "./services/auth/token.service";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { MeService } from "./services/auth/me.service";
import { Subscription } from "rxjs";

import { environment } from "../environments/environment";
import axios from "axios";
@Component({
   selector: "app-root",
   templateUrl: "app.component.html",
   styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnChanges {
   public storageSub: Subscription | undefined;
   @Input()
   public usuario: any = null;
   public isProd: boolean = environment.production ?? false;

   public appPages: any[] = [];
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
      console.log("Ambiente es productivo? ", this.isProd);
      await this.storage.create();

      // Genera el menu dependiendo del ambiente
      this.setMenuSide();

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

   goFullscreen() {
      const el = document.documentElement as any;
      if (el.requestFullscreen) {
         el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
         el.webkitRequestFullscreen(); // Safari
      } else if (el.msRequestFullscreen) {
         el.msRequestFullscreen(); // IE11
      }
   }

   async setMenuSide() {
      this.appPages = [
         // maquina local
         {
            title: "Teclado Cliente",
            url: "/keyboard",
         },
         {
            title: "Teclado Prueba",
            url: "/keyboard-slot-test",
         },
         {
            title: "Configuración APP",
            url: "/maquina-local",
         },
      ];
   }
}
