import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ProductoModalTableComponent } from '../../../components/producto/producto-modal-table/producto-modal-table.component';
import { ProductoModalFormComponent } from 'src/app/components/producto/producto-modal-form/producto-modal-form.component';
import { ClienteModalTableComponent } from '../../../components/cliente/cliente-modal-table/cliente-modal-table.component';
import { Detalle_producto } from 'src/app/interfaces/productos.interface';
import { Cliente } from 'src/app/interfaces/clientes.interface';

@Component({
  selector: 'app-preventa-form',
  templateUrl: './preventa-form.page.html',
  styleUrls: ['./preventa-form.page.scss'],
})
export class PreventaFormPage {

  clienteForm: FormGroup;
  clientes: Cliente[] = [];
  clienteIdInput: string = '';
  productos: Detalle_producto[] = [];
  ci: string = '';
  nombre: string = '';

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.clienteForm = this.formBuilder.group({
      ci: ['', Validators.required],
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
    modal.onDidDismiss().then((data) => {
      if (data) {
        const cliente = data?.data;
        if (cliente) {         
          this.clienteForm.patchValue({
            ci: cliente.ci,
            nombre: cliente.nombre
          });    
        }
      }
    });
    await modal.present();
  }
 
  async abrirProductoModalTabla() {
    const modal = await this.modalController.create({
      component: ProductoModalTableComponent,
    });
    modal.onDidDismiss().then((data) => {
      const producto = data?.data;
      if (producto) {
        if (!this.productos.some(p => p.codigo === producto.codigo)) {
          this.productos.push(producto);         
        }
      }
    });
    console.log(this.clienteForm);
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
  

  onSubmit() {
    console.log(this.clienteForm.value);
    console.log(this.productos);
  }
}
