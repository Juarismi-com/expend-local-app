import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductoModalFormComponent } from './components/producto/producto-modal-form/producto-modal-form.component';
import { ProductoModalTableComponent } from './components/producto/producto-modal-table/producto-modal-table.component';
import { ClienteModalFormComponent } from './components/cliente/cliente-modal-form/cliente-modal-form.component';
import { ClienteModalTableComponent } from './components/cliente/cliente-modal-table/cliente-modal-table.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';

@NgModule({
  declarations: [
    AppComponent,  
    ProductoModalFormComponent,
    ClienteModalTableComponent,
    ClienteModalFormComponent,
    ProductoModalTableComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: "blogic_app_db",
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
