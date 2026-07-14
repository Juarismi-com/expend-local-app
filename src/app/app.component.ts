import {
   Component,
   Input,
   OnChanges,
   OnInit,
   OnDestroy,
   HostListener,
} from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { StorageService } from "./services/storage.service";
import { TokenService } from "./services/auth/token.service";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { MeService } from "./services/auth/me.service";
import { Subscription, from, interval } from "rxjs";
import { switchMap } from "rxjs/operators";
import axios from "axios";

import { environment } from "../environments/environment";
import { MaquinaExpendedoraService } from "./services/maquina-expendedora.service";

const VERSION_CHECK_INTERVAL_MS = 60000;

@Component({
   selector: "app-root",
   templateUrl: "app.component.html",
   styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnChanges, OnInit, OnDestroy {
   public storageSub: Subscription | undefined;
   private intervaloSub: Subscription | undefined;
   private versionCheckSub: Subscription | undefined;
   private currentVersion: string | null = null;

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

      this.watchAppVersion();
   }

   ngOnDestroy(): void {
      if (this.storageSub) this.storageSub.unsubscribe();
      if (this.intervaloSub) this.intervaloSub.unsubscribe();
      if (this.versionCheckSub) this.versionCheckSub.unsubscribe();
   }

   // Recarga la app sola cuando detecta que se publicó una nueva versión
   async watchAppVersion() {
      try {
         const { data } = await axios.get(`${environment.apiUrl}/versiones`);
         this.currentVersion = data[0]?.nro_version ?? null;
      } catch (e) {
         console.error("No se pudo obtener la versión inicial de la app", e);
      }

      this.versionCheckSub = interval(VERSION_CHECK_INTERVAL_MS)
         .pipe(
            switchMap(() =>
               from(axios.get(`${environment.apiUrl}/versiones`)),
            ),
         )
         .subscribe(({ data }) => {
            const latestVersion = data[0]?.nro_version ?? null;
            if (
               this.currentVersion &&
               latestVersion &&
               latestVersion !== this.currentVersion
            ) {
               window.location.reload();
            }
         });
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

   @HostListener("document:click")
   @HostListener("document:touchstart")
   onScreenInteraction() {
      this.goFullscreen();
   }

   goFullscreen() {
      if (document.fullscreenElement) return;
      const el = document.documentElement as any;
      try {
         if (el.requestFullscreen) {
            el.requestFullscreen()?.catch(() => {});
         } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen(); // Safari
         } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen(); // IE11
         }
      } catch {
         // Fullscreen puede estar bloqueado por permisos del navegador/entorno
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
