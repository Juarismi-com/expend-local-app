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
 
   // Busca el precio con cantidad igual a 1
   getPrecioCantidad1(producto: Producto): number {   
    const precioCantidad1 = producto.precios.find(precio => precio.cantidad === 1);   
    return precioCantidad1 ? precioCantidad1.precio_unitario : 0;
  }

  seleccionarProducto(producto: Producto) {
    const productoSeleccionado = {
      codigo: producto.codigo,
      descripcion: producto.descripcion,
      precio: producto.precios
    };
    this.modalController.dismiss(productoSeleccionado);
  }

  cerrarModal() {
    this.modalController.dismiss();
  }  

}
