import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { clienteList } from 'src/app/mocks/clientes.mock';
import { Cliente } from 'src/app/interfaces/clientes.interface';
import { ClienteModalFormComponent } from '../cliente-modal-form/cliente-modal-form.component';
import { removeAccents } from 'src/app/helpers/index.helper';

@Component({
  selector: 'app-cliente-modal-form',
  templateUrl: './cliente-modal-table.component.html',
  styleUrls: ['./cliente-modal-table.component.scss'],
})
export class ClienteModalTableComponent implements OnInit {

  clientes: Cliente[] = [];
  filtro: string = '';

  constructor(private modalController: ModalController) { }
 
  ngOnInit() {
    this.clientes = clienteList();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }  

  filtrarClientes() {
    return this.clientes.filter(cliente => {      
      const filtroSinAcentos = removeAccents(this.filtro.toLowerCase());
      const nombreSinAcentos = removeAccents(cliente.nombre.toLowerCase());
      return cliente.ci.toString().includes(filtroSinAcentos) || nombreSinAcentos.includes(filtroSinAcentos);
    });
  }

  hayResultados(): boolean {
    return this.filtrarClientes().length === 0;
  }

  async abrirClienteModalForm() {
    const modal = await this.modalController.create({
      component: ClienteModalFormComponent
    });
    return await modal.present();
  }
   
  seleccionarCliente(clientes: Cliente) {    
    const clienteSeleccionado = {
      ci: clientes.ci,
      nombre: clientes.nombre     
    };    
    this.modalController.dismiss(clienteSeleccionado);
  }

}
