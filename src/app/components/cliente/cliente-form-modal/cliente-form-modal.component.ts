import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeoSimplePage } from 'src/app/pages/common/geo/geo-simple/geo-simple.page';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { CiudadService } from 'src/app/services/ciudad.service';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cliente-form-modal',
  templateUrl: './cliente-form-modal.component.html',
  styleUrls: ['./cliente-form-modal.component.scss'],
})
export class ClienteFormModalComponent implements OnInit {
  clienteForm: FormGroup;
  departamentos: any[] = [];
  ciudades: any[] = [];
  categoriaClientes: any[] = [];
  nombre: string = '';
  clientes: any[] = [];

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private departamentoService: DepartamentoService,
    private ciudadService: CiudadService,
    private alertController: AlertController,
    private clienteService: ClienteService
  ) {
    this.clienteForm = this.setClienteFormDefault();
  }

  ngOnInit() {
    this.loadDepartamentos();
    this.getCategoriaClientes();
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
      fecha_registro: [''],
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
      this.categoriaClientes = (
        await axios.get(`${environment.apiUrl}/categorias/clientes`)
      ).data;
    } catch (error) {
      console.error('Error al cargar los departamentos', error);
    }
  }

  async handleInputSearch(e: any) {
    try {
      const value = e.target.value.toLowerCase();
      this.clientes = await this.clienteService.searchClient(value);

      this.clienteForm.patchValue({
        nombre: this.clientes[0].nombre,
        telefono: this.clientes[0].telefono,
        id_departamento: this.clientes[0].id_departamento,
      });

      await this.onDepartamentoChange({
        detail: { value: this.clientes[0].id_departamento },
      });

      this.clienteForm.patchValue({ id_ciudad: this.clientes[0].id_ciudad });
    } catch (error) {
      console.error('Error al buscar clientes', error);
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async setGeobicationModal() {
    const modal = await this.modalController.create({
      component: GeoSimplePage,
      componentProps: {
        latitude: 25, // Coordenadas de ejemplo
        longitude: -56,
      },
    });
    modal.present();
  }

  // todo: move to cliente service
  async clienteFormSubmit() {
    try {
      const { data: clientes } = await axios.get(
        `${environment.apiUrl}/clientes/search?q=${this.clienteForm.value.ruc}`
      );

      const clienteExistente = clientes.count > 0;
      const clienteId = clienteExistente ? clientes.rows[0].id : null;

      const alert = await this.alertController.create({
        header: 'Confirmación',
        message: clienteExistente
          ? `¿Desea editar el cliente?
              ${this.clienteForm.value?.nombre}`
          : `¿Desea guardar el cliente?
              ${this.clienteForm.value?.nombre}`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Operación cancelada');
            },
          },
          {
            text: 'Aceptar',
            handler: async () => {
              try {
                let result;

                if (clienteExistente) {
                  result = await axios.put(
                    `${environment.apiUrl}/clientes/${clienteId}`,
                    { ...this.clienteForm.value }
                  );
                  window.alert('Se actualizó el cliente');
                } else {
                  result = await axios.post(`${environment.apiUrl}/clientes`, {
                    ...this.clienteForm.value,
                  });
                  window.alert('Se agregó el cliente');
                }

                console.log(result);
                this.clienteForm = this.setClienteFormDefault();
              } catch (error) {
                console.error('Error al guardar/editar el cliente', error);
                window.alert('Ocurrió un error. Intente nuevamente.');
              }
            },
          },
        ],
      });

      await alert.present();
    } catch (error) {
      console.error('Error al buscar el cliente', error);
      window.alert(
        'Ocurrió un error al verificar el cliente. Intente nuevamente.'
      );
    }
  }
}
