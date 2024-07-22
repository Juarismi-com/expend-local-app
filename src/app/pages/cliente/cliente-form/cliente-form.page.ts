import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { CiudadService } from 'src/app/services/ciudad.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.page.html',
  styleUrls: ['./cliente-form.page.scss'],
})
export class ClienteFormPage implements OnInit {

  clienteForm!: FormGroup;
  departamentos: any[] = [];
  ciudades: any[] = [];
 
  constructor(
    private formBuilder: FormBuilder,
    private departamentoService: DepartamentoService,
    private ciudadService: CiudadService
  ) { }

  setClienteFormDefault() {
    return this.formBuilder.group({
      nombre: ['', Validators.required],
      direccion: [''],
      telefono: [''],
      email: ['', Validators.email],
      ruc: [''],
      ci: ['', Validators.required],
      departamento: [''],
      ciudad: [''],
      lat: [''],
      lng: [''],
      gps: [''],
      comentario: [''],
      user_id: [null],
      fecha_registro: ['']
    });
  }

  ngOnInit() {
    this.clienteForm = this.setClienteFormDefault(); 
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

  async clienteFormSubmit() {
    console.log(this.clienteForm.value);
    console.log(this.departamentos);
  }
}
