import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductoModalFormComponent } from './components/producto/producto-modal-form/producto-modal-form.component';
import { ProductoModalTableComponent } from './components/producto/producto-modal-table/producto-modal-table.component';
import { ClienteModalTableComponent } from './components/cliente/cliente-modal-table/cliente-modal-table.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ProductoModalFormComponent,
    ClienteModalTableComponent,
    ProductoModalTableComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
