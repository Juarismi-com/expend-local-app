import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.scss'],
 
})
export class ModalProductoComponent   {

  constructor(private modalController: ModalController) { }
 
  cerrarModal() {
    this.modalController.dismiss();
  }  

}
