import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cliente } from 'src/app/interfaces/clientes.interface';
import { ClienteFormModalComponent } from '../cliente-form-modal/cliente-form-modal.component';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-modal-form',
  templateUrl: './cliente-table-modal.component.html',
  styleUrls: ['./cliente-table-modal.component.scss'],
})
export class ClienteTableModalComponent {
  clientes: any[] = [];

  constructor(
    private modalController: ModalController,
    private clienteService: ClienteService
  ) {}

  async handleInputSearch(e: any) {
    const value = e.target.value.toLowerCase();
    this.clientes = await this.clienteService.searchClient(value);
  }

  showButtonAddCliente(): boolean {
    return this.clientes.length === 0;
  }

  async openClienteFormModal() {
    const modal = await this.modalController.create({
      component: ClienteFormModalComponent,
    });
    return await modal.present();
  }

  async selectClient(cliente: Cliente) {
    this.modalController.dismiss(cliente);
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
