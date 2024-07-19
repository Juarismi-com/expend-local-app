import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeoSimplePage } from 'src/app/pages/common/geo/geo-simple/geo-simple.page';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { CiudadService } from 'src/app/services/ciudad.service';

@Component({
  selector: 'app-cliente-form-modal',
  templateUrl: './cliente-form-modal.component.html',
  styleUrls: ['./cliente-form-modal.component.scss'],
})
export class ClienteFormModalComponent implements OnInit {
  clienteForm: FormGroup;
  departamentos: any[] = [];
  ciudades: any[] = [];

  ciRuc: string = '';
  nombre: string = '';

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private departamentoService: DepartamentoService,
    private ciudadService: CiudadService
  ) {
    this.clienteForm = this.formBuilder.group({
      ciRuc: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      departamento: [''],
      ciudad: [''],
    });
  }

  ngOnInit() {
    this.loadDepartamentos();
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

  cerrarModal() {
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
}
