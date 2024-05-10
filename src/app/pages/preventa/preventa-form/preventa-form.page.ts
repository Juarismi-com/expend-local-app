import { Component, OnInit } from '@angular/core';
import { clienteList } from 'src/app/mocks/clientes.mock';
import { ModalController } from '@ionic/angular';
import { ModalProductoComponent } from '../../../components/modal-producto/modal-producto.component';

@Component({
  selector: 'app-preventa-form',
  templateUrl: './preventa-form.page.html',
  styleUrls: ['./preventa-form.page.scss'],
})
export class PreventaFormPage implements OnInit {
  clientes: { id: number; name: string; }[] = [];
  filteredClientes: { id: number; name: string; }[] = [];
  selectedCliente: number | undefined;
  searchTerm: string = '';

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.clientes = clienteList();
    this.filteredClientes = this.clientes;
  }

  filterClientes() {
    this.filteredClientes = this.clientes.filter(cliente =>
      cliente.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );    
  }

  async abrirModalProducto() {
    const modal = await this.modalController.create({
      component: ModalProductoComponent,
      cssClass: 'modal-producto'
    });
    return await modal.present();
  }

  onSubmit() {
    
  }

  

}
