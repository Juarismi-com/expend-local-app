import { Component, OnInit } from '@angular/core';
import { clienteList } from 'src/app/mocks/clientes.mock';
import { ModalController } from '@ionic/angular';
import { ProductoModalFormComponent } from '../../../components/producto/producto-modal-form/producto-modal-form.component';
import { ClienteModalTableComponent } from '../../../components/cliente/cliente-modal-table/cliente-modal-table.component';
import { Producto } from 'src/app/interfaces/productos.interface';

@Component({
  selector: 'app-preventa-form',
  templateUrl: './preventa-form.page.html',
  styleUrls: ['./preventa-form.page.scss'],
})
export class PreventaFormPage implements OnInit {
  clientes: { id: number; name: string; }[] = [];  
  clienteIdInput: string = "";
  productos: Producto[] = [];

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.clientes = clienteList();   
  }

  async abrirClienteModalTable() {
    const modal = await this.modalController.create({
      component: ClienteModalTableComponent
    });
    modal.onDidDismiss().then(data => {
      const clienteId = data?.data;
      if (clienteId) {        
        this.clienteIdInput = clienteId.toString();
      }
    });
    await modal.present();
  }

  async abrirProductoModalForm() {
    const modal = await this.modalController.create({
      component: ProductoModalFormComponent,
      cssClass: 'modal-producto'
    });
    return await modal.present();
  } 

  onSubmit() {
    
  }

  

}
