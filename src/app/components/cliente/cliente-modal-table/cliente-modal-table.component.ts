import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { clienteList } from 'src/app/mocks/clientes.mock';
import { Cliente } from 'src/app/interfaces/clientes.interface';

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
      return cliente.ci.toString().includes(this.filtro) || cliente.nombre.toLowerCase().includes(this.filtro.toLowerCase());
    });
  }
 
  seleccionarCliente(clientes: Cliente) {    
    const clienteSeleccionado = {
      ci: clientes.ci,
      nombre: clientes.nombre     
    };    
    this.modalController.dismiss(clienteSeleccionado);
  }

}
