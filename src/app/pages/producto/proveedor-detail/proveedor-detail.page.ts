import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ProveedorTableModalComponent } from '../../../components/proveedor/proveedor-table-modal/proveedor-table-modal.component';

@Component({
  selector: 'app-proveedor-detail',
  templateUrl: './proveedor-detail.page.html',
  styleUrls: ['./proveedor-detail.page.scss'],
})
export class ProveedorDetailPage {
  proveedorForm: FormGroup;
  public results: any[] = [];

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private proveedorService: ProveedorService
  ) {
    this.proveedorForm = this.setProveedorFormDefault();
  }

  setProveedorFormDefault() {
    return this.formBuilder.group({
      id: ['0', Validators.required],
      nombre: ['SIN PROVEEDOR', Validators.required],
    });
  }

  async handleInputSearch(e: any) {
    const value = e.target.value.toLowerCase();
    this.results = await this.proveedorService.searchProducto(value);
  }

  setProveedor(nombre: string, id: string | number) {
    this.proveedorForm.patchValue({
      nombre: nombre,
      id: id,
    });
  }

  async searchProductos(id: number) {
    this.results = await this.proveedorService.searchProductosByProveedorId(id);
    console.log(this.results);
  }

  async openProveedorTableModal() {
    const modal = await this.modalController.create({
      component: ProveedorTableModalComponent,
    });

    modal.onDidDismiss().then(async ({ data }) => {
      const proveedor = data;
      if (proveedor) {
        this.setProveedor(proveedor.nombre, proveedor.id);
        await this.searchProductos(proveedor.id);
      }
    });
    await modal.present();
  }
}
