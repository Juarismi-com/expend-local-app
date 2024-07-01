import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductoModalFormComponent } from './components/producto/producto-form-modal/producto-form-modal.component';
import { ProductoModalTableComponent } from './components/producto/producto-table-modal/producto-table-modal.component';
import { ClienteModalFormComponent } from './components/cliente/cliente-form-modal/cliente-form-modal.component';
import { ClienteModalTableComponent } from './components/cliente/cliente-table-modal/cliente-table-modal.component';
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
  bootstrap: [AppComponent]
})
export class AppModule {}
