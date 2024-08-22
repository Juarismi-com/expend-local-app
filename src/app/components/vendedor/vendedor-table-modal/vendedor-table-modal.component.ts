import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Vendedor } from 'src/app/interfaces/vendedores.interface';
import { VendedorService } from 'src/app/services/vendedor.service';

@Component({
  selector: 'app-vendedor-table-modal',
  templateUrl: './vendedor-table-modal.component.html',
  styleUrls: ['./vendedor-table-modal.component.scss'],
})
export class VendedorTableModalComponent implements OnInit {
  vendedores: any[] = [];

  constructor(
    private modalController: ModalController,
    private vendedorService: VendedorService
  ) {}

  async ngOnInit() {
    this.vendedores = await this.vendedorService.getVendedor();
  }

  async handleInputSearch(e: any) {
    const value = e.target.value.toLowerCase();
    this.vendedores = await this.vendedorService.searchVendedor(value);
  }

  async selectVendedor(vendedor: Vendedor) {
    this.modalController.dismiss(vendedor);
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
