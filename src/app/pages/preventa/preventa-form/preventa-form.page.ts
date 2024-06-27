import { Component, ComponentRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, AlertController, ModalOptions } from '@ionic/angular';
import { ProductoModalTableComponent } from '../../../components/producto/producto-modal-table/producto-modal-table.component';
import { ProductoModalFormComponent } from 'src/app/components/producto/producto-modal-form/producto-modal-form.component';
import { ClienteModalTableComponent } from '../../../components/cliente/cliente-modal-table/cliente-modal-table.component';
import { Detalle_producto } from 'src/app/interfaces/productos.interface';
import { Cliente } from 'src/app/interfaces/clientes.interface';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-preventa-form',
  templateUrl: './preventa-form.page.html',
  styleUrls: ['./preventa-form.page.scss'],
})
export class PreventaFormPage {

  preventaForm: FormGroup;
  clientes: Cliente[] = [];
  clienteIdInput: string = '';

  productos: Detalle_producto[] = [];
  formaPagoList: any[] = [
      "Efectivo",
      "Tarjetas de Crédito",
      "Tarjetas de Débito",
      "Transferencias Bancarias",
      "Pagos Móviles",
      "Billeteras Digitales",
      "Pagos a Plazos",
      "Pagos Contra Reembolso"
  ]
  ciRuc: string = '';
  nombre: string = '';

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private storageService: StorageService,
  ) {
    this.preventaForm = this.formBuilder.group({
      ciRuc: ['', Validators.required],
      nombre: ['', Validators.required],
      formaPago: [null, Validators.required],
      tipoVenta: [null, Validators.required],
      observacion: [null, Validators.required],
    });  
  }
 

  async abrirClienteModalTable() {
    const modal = await this.modalController.create({
      component: ClienteModalTableComponent,
    });
    modal.onDidDismiss().then(async (data) => {
      if (data) {
        const cliente = data?.data;
        if (cliente) {         

          if (cliente) {         
            this.preventaForm.patchValue({
              ci: cliente.ci,
              nombre: cliente.nombre
            });    
          }     

        }
      }
    });
    await modal.present();
  }
 

  /**
   * Abre el model con el listado de productos
   */
  async openProductoTableModal() {
    const modal = await this.modalController.create({
      component: ProductoModalTableComponent,
    });
    
    modal.onDidDismiss().then(async (data) => {
      const producto = data?.data;
      if (producto && !this.productos.some(p => p.codigo === producto.codigo)) {
          this.productos.push(producto);
      }

      // todo migrarlo a un service PreventaService
      this.storageService.set("preventa/preventa-form", {
        ...this.preventaForm.value,
        productos: this.productos
      })
    });
    console.log(this.preventaForm);
    await modal.present();
  }

  async abrirFormProducto(producto: Detalle_producto) {
    const modal = await this.modalController.create({
      component: ProductoModalFormComponent,
      componentProps: { producto }
    });    
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        const productoActualizado = data.data as Detalle_producto;
        const index = this.productos.findIndex(p => p.codigo === productoActualizado.codigo);
        if (index > -1) {
          this.productos[index] = productoActualizado;
        }
      }
    });
    await modal.present();
  }

  async eliminarProductoTabla(producto: Detalle_producto) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: `¿Está seguro de que desea eliminar el producto con código ${producto.codigo}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.productos = this.productos.filter(p => p.codigo !== producto.codigo);
          }
        }
      ]
    });
    await alert.present();
  }

  async preventaFormSubmit() {
    //this.storageService.set*this.preventaForm.value

    const preventaList = await this.storageService.get("preventa/preventa-list") || [];
    const preventaForm = await this.storageService.get("preventa/preventa-form");
    preventaList.push(preventaForm);
    
    this.storageService.set("preventa/preventa-list", preventaList);
  }
}
