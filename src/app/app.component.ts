import { Component, Input, OnChanges, OnInit, OnDestroy } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { StorageService } from "./services/storage.service";
import { TokenService } from "./services/auth/token.service";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { MeService } from "./services/auth/me.service";
import { Subscription, from, interval } from "rxjs";
import { switchMap } from "rxjs/operators";

import { environment } from "../environments/environment";
import { MaquinaExpendedoraService } from "./services/maquina-expendedora.service";

@Component({
   selector: "app-root",
   templateUrl: "app.component.html",
   styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnChanges, OnInit, OnDestroy {
   public storageSub: Subscription | undefined;
   private intervaloSub: Subscription | undefined;

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
      private maquinaService: MaquinaExpendedoraService,
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

      // info de la maquina
      const maquina_id = await this.storageService.get("MAQUINA_ID");
      if (!maquina_id) {
         alert("Maquina no esta definida");

         this.router.navigate(["/maquina-local"]);
         return;
      }

      // recargar el valor de la ip
      this.intervaloSub = interval(300000)
         .pipe(
            switchMap(() =>
               from(
                  // asignamo el slot numero 1, pero puede ser cualquier
                  this.maquinaService.getMaquinaExpendedoraByUuuid(
                     maquina_id,
                     1,
                  ),
               ),
            ),
         )
         .subscribe((data) => {
            const maquinaIp = data?.maquinaIp[0]?.ip || null;
            if (maquinaIp != null) {
               this.storageService.set(
                  "MACHINE_HOST",
                  `http://${maquinaIp}:5001`,
               );
            }
         });
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
            title: "Dispensador Prueba",
            url: "/dispenser-list-test",
         },
         {
            title: "Configuración APP",
            url: "/maquina-local",
         },
      ];
   }
}
