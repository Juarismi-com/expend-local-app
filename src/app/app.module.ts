import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";

import { AppRoutingModule } from "./app-routing.module";

import { IonicStorageModule } from "@ionic/storage-angular";
import { Drivers } from "@ionic/storage";
import { PipeModule } from "./pipes/pipe/pipe.module";

import localeEs from "@angular/common/locales/es";

@NgModule({
   declarations: [AppComponent],
   imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      IonicStorageModule.forRoot({
         name: "extend_app_db",
         driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
      }),
      PipeModule,
   ],
   providers: [
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      { provide: LOCALE_ID, useValue: "es-ES" },
   ],
   bootstrap: [AppComponent],
})
export class AppModule {}
