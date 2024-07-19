import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeoSimplePage } from 'src/app/pages/common/geo/geo-simple/geo-simple.page';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { CiudadService } from 'src/app/services/ciudad.service';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cliente-form-modal',
  templateUrl: './cliente-form-modal.component.html',
  styleUrls: ['./cliente-form-modal.component.scss'],
})
export class ClienteModalFormComponent implements OnInit {
  clienteForm: FormGroup;
  departamentos: any[] = [];
  ciudades: any[] = [];
  categoriaClientes: any[] = [];
  nombre: string = '';  

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private departamentoService: DepartamentoService,
    private ciudadService: CiudadService,
    private alertController: AlertController
    
  ) {
    this.clienteForm = this.setClienteFormDefault();
  }

  

  ngOnInit() {   
    
    this.loadDepartamentos(); 
    this.getCategoriaClientes()
  }

  setClienteFormDefault() {
    return this.formBuilder.group({
      nombre: ['', Validators.required],
      direccion: [''],
      telefono: [''],
      email: ['', Validators.email],
      ruc: [''],
      ci: ['', Validators.required],
      id_departamento: [''],
      id_ciudad: [''],
      id_categoria_cliente: [1, Validators.required],
      lat: [''],
      lng: [''],
      gps: [''],
      comentario: [''],
      user_id: [null],
      fecha_registro: ['']
    });
  }

  async loadDepartamentos() {
    try {
      this.departamentos = await this.departamentoService.getDepartamentos();
    } catch (error) {
      console.error('Error al cargar los departamentos', error);
    }
  }

  async onDepartamentoChange(event: any) {
    const id = event.detail.value;
    this.ciudades = await this.ciudadService.getCiudadesPorDepartamento(id);    
  }

  // todo move to client service
  async getCategoriaClientes() {
    try {
      this.categoriaClientes = (await axios.get(`${environment.apiUrl}/categorias/clientes`)).data;
      
    } catch (error) {
      console.error('Error al cargar los departamentos', error);
    }
  }

  closeModal() {
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

  // todo: cuando se actualiza el cliente, debe enviar al put
  // todo: move to cliente service
  async clienteFormSubmit(){
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: `¿Desea guardar el cliente?
        ${this.clienteForm.value?.nombre}
      `,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        }, {
          text: 'Aceptar',
          handler: async () => {
            const result =  await axios.post(`${environment.apiUrl}/clientes`, {
              ...this.clienteForm.value
            });
            console.log(result);

            // todo replace with toast
            window.alert("Se agrego el cliente")
            this.clienteForm = this.setClienteFormDefault();
          } 
        }
      ]
    });

    await alert.present();
  }

}
