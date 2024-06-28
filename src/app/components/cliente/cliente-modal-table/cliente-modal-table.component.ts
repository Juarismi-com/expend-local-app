import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cliente } from 'src/app/interfaces/clientes.interface';
import { ClienteModalFormComponent } from '../cliente-modal-form/cliente-modal-form.component';
import { removeAccents } from 'src/app/helpers/index.helper';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-modal-form',
  templateUrl: './cliente-modal-table.component.html',
  styleUrls: ['./cliente-modal-table.component.scss'],
})
export class ClienteModalTableComponent implements OnInit {

  clientes: any[] = [];
  
  constructor(private modalController: ModalController, private clienteService: ClienteService) { }
 
  ngOnInit() {
    
  }

  async handleInputSearch(e: any) {
    const value = e.target.value.toLowerCase();
    this.clientes =  await this.clienteService.searchClient(value)
  }

  showButtonAddCliente(): boolean {
    return this.clientes.length === 0;
  }

  async abrirClienteModalForm() {
    const modal = await this.modalController.create({
      component: ClienteModalFormComponent
    });
    return await modal.present();
  }
   
  async selectClient(clientes: Cliente) {    
    const clientSelected = {
      ciRuc: clientes.ruc,
      nombre: clientes.nombre     
    };    

    this.modalController.dismiss(clientSelected);
  }

   closeModal() {
    this.modalController.dismiss();
  }  

}
