import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeoSimplePage } from 'src/app/pages/common/geo/geo-simple/geo-simple.page';

@Component({
  selector: 'app-cliente-form-modal',
  templateUrl: './cliente-form-modal.component.html',
  styleUrls: ['./cliente-form-modal.component.scss'],
})
export class ClienteModalFormComponent {
  clienteForm: FormGroup;

  ciRuc: string = '';
  nombre: string = '';  

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.clienteForm = this.formBuilder.group({
      ciRuc: ['', Validators.required],
      nombre: ['', Validators.required],      
      telefono: ['', Validators.required], 
      
    });
  }

  cerrarModal() {
    this.modalController.dismiss();
  }


  async setGeobicationModal(){
    const modal = await this.modalController.create({
      component: GeoSimplePage,
      componentProps: {
        latitude: 25,  // Coordenadas de ejemplo
        longitude: -56
      }
    });
    modal.present()
  }

}
