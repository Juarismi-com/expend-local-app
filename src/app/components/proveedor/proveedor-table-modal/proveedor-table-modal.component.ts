import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Proveedor } from 'src/app/interfaces/proveedores.interface';

@Component({
  selector: 'app-proveedor-table-modal',
  templateUrl: './proveedor-table-modal.component.html',
  styleUrls: ['./proveedor-table-modal.component.scss'],
})
export class ProveedorTableModalComponent {
  proveedores: any[] = [];

  constructor(
    private modalController: ModalController,
    private proveedorService: ProveedorService
  ) {}

  async handleInputSearch(e: any) {
    const value = e.target.value.toLowerCase();
    this.proveedores = await this.proveedorService.searchProveedor(value);
  }

  async selectProveedor(proveedor: Proveedor) {
    this.modalController.dismiss(proveedor);
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
