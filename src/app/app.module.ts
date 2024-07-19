import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductoFormModalComponent } from './components/producto/producto-form-modal/producto-form-modal.component';
import { ProductoTableModalComponent } from './components/producto/producto-table-modal/producto-table-modal.component';
import { ClienteFormModalComponent } from './components/cliente/cliente-form-modal/cliente-form-modal.component';
import { ClienteTableModalComponent } from './components/cliente/cliente-table-modal/cliente-table-modal.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { PipeModule } from './pipes/pipe/pipe.module';

@NgModule({
  declarations: [
    AppComponent,
    ProductoFormModalComponent,
    ClienteTableModalComponent,
    ClienteFormModalComponent,
    ProductoTableModalComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: 'blogic_app_db',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
    }),
    PipeModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
