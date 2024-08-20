import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductoService } from 'src/app/services/producto.service';
import { ProductoFormModalComponent } from '../producto-form-modal/producto-form-modal.component';

@Component({
  selector: 'app-producto-table-modal',
  templateUrl: './producto-table-modal.component.html',
  styleUrls: ['./producto-table-modal.component.scss'],
})
export class ProductoTableModalComponent {
  productos: any[] = [];
  productoSelected: any = null;
  productoAdded = [];

  constructor(
    private modalController: ModalController,
    private productoService: ProductoService,
  ) {}

  async handleInputSearch(e: any) {
    const value = e.target.value.toLowerCase();
    this.productos = await this.productoService.searchProduct(value);
  }

  async selectProduct(producto: any) {
    const prices = this.productoService.setListOfPrices(producto);
    const precio = prices[1]?.precio || producto.precio
    const descuento = prices[1]?.descuento

    const modal = await this.modalController.create({
      component: ProductoFormModalComponent,
      componentProps: {
        producto: {
          ...producto,
          producto_id: producto.id,
          precio_unitario: precio,
          cantidad: 1,
          descuento,
          subtotal: precio * 1,
          precio_lista: prices,
        },
      },
    });

    modal.onDidDismiss().then(({ data }) => {
      const producto = data;
      if (producto){
        this.modalController.dismiss({
          ...producto,
          precio_unitario: producto?.precio_unitario,
          descuento: producto?.descuento || 0,
          cantidad: producto?.cantidad || 1,
          subtotal: producto?.subtotal,
        });
      }
    });
    await modal.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
