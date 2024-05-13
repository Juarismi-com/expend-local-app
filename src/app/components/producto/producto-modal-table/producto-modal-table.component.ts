import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { productList } from 'src/app/mocks/productos.mock';
import { Producto } from 'src/app/interfaces/productos.interface';

@Component({
  selector: 'app-producto-modal-table',
  templateUrl: './producto-modal-table.component.html',
  styleUrls: ['./producto-modal-table.component.scss'],
})
export class ProductoModalTableComponent implements OnInit {

  productos: Producto[] = [];

  constructor(private modalController: ModalController) { }
 
  ngOnInit() {
    this.productos = productList();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }  

  seleccionarProducto(producto: Producto) {
    const productoSeleccionado = {
      codigo: producto.codigo,
      descripcion: producto.descripcion
    };
    this.modalController.dismiss(productoSeleccionado);
  }

}
