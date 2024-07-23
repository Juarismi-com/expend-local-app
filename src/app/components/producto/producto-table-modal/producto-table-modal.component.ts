import { Component } from '@angular/core';
import { AlertController, AlertInput, ModalController } from '@ionic/angular';
//import { removeAccents } from 'src/app/helpers/index.helper';
import { ProductoService } from 'src/app/services/producto.service';
import { ProductoFormModalComponent } from '../producto-form-modal/producto-form-modal.component';
//import { ProductoModalFormComponent } from '../producto-modal-form/producto-modal-form.component';

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
    private alertController: AlertController
  ) {}

  async handleInputSearch(e: any) {
    const value = e.target.value.toLowerCase();
    this.productos = await this.productoService.searchProduct(value);
  }

  async selectProduct(producto: any) {
    const prices = this.productoService.setListOfPrices(producto);
    const modal = await this.modalController.create({
      component: ProductoFormModalComponent,
      componentProps: {
        producto: {
          ...producto,
          producto_id: producto.id,
          precio_unitario: producto.precio,
          cantidad: 1,
          subtotal: producto.precio * 1,
          precio_lista: prices,
        },
      },
    });

    modal.onDidDismiss().then(({ data }) => {
      const producto = data;
      this.modalController.dismiss({
        ...producto,
        precio_unitario: producto.precio_seleccionado || producto.precio,
        descuento: producto.descuento,
        cantidad: producto.cantidad,
        subtotal: producto.subtotal,
      });
    });
    await modal.present();
  }

  /**
   * Confirma la seccion y lo retorna con el modal
   * @param producto
   */
  confirmProductSelected(producto: any) {
    /*this.modalController.dismiss({
      "nombre": producto.nombre,
      "producto_id": producto.id,
      "precio_unitario": producto.precio,
      "descuento": producto,
      "cantidad": 1,
      "subtotal": precioSeleccionado
    })*/
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
