import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { clienteList } from 'src/app/mocks/clientes.mock';

@Component({
  selector: 'app-cliente-modal-form',
  templateUrl: './cliente-modal-table.component.html',
  styleUrls: ['./cliente-modal-table.component.scss'],
})
export class ClienteModalTableComponent implements OnInit {

  clientes: { id: number; name: string; }[] = [];

  constructor(private modalController: ModalController) { }
 
  ngOnInit() {
    this.clientes = clienteList();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }  

  seleccionarCliente(clientes: { id: number; name: string }) {    
    const clienteId = clientes.id;
    this.modalController.dismiss(clienteId);
  }

}
