import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente-modal-form',
  templateUrl: './cliente-modal-form.component.html',
  styleUrls: ['./cliente-modal-form.component.scss'],
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
    });
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

}
