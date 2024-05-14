import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { clienteList } from 'src/app/mocks/clientes.mock';
import { ModalController } from '@ionic/angular';
import { ProductoModalFormComponent } from '../../../components/producto/producto-modal-form/producto-modal-form.component';
import { ClienteModalTableComponent } from '../../../components/cliente/cliente-modal-table/cliente-modal-table.component';
import { Producto } from 'src/app/interfaces/productos.interface';
import { Cliente } from 'src/app/interfaces/clientes.interface';

@Component({
  selector: 'app-preventa-form',
  templateUrl: './preventa-form.page.html',
  styleUrls: ['./preventa-form.page.scss'],
})
export class PreventaFormPage implements OnInit {
  clienteForm: FormGroup;
  clientes: Cliente[] = [];  
  clienteIdInput: string = "";
  productos: Producto[] = [];

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


  ngOnInit() {
    this.clientes = clienteList();   
  }

  async abrirClienteModalTable() {
    const modal = await this.modalController.create({
      component: ClienteModalTableComponent
    });
    modal.onDidDismiss().then(data => {
      const cliente = data?.data;
      if (cliente) {               
        this.clienteForm.patchValue({
          ci: cliente.ci,
          nombre: cliente.nombre,
        });
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
