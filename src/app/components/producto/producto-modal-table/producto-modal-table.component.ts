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

  getPrecioCantidad1(producto: Producto): number {   
    const precioCantidad1 = producto.precios.find(precio => precio.cantidad === 1);    
    return precioCantidad1 ? precioCantidad1.precio_unitario : 0;
  }
   
  seleccionarProducto(producto: Producto) {    
    const precioCantidad1 = this.getPrecioCantidad1(producto);
    const productoSeleccionado = {
      codigo: producto.codigo,
      descripcion: producto.descripcion,      
      precio: precioCantidad1,
      cantidad: 1,
      totalUnitario: precioCantidad1
    };    
    this.modalController.dismiss(productoSeleccionado);
  }

  cerrarModal() {
    this.modalController.dismiss();
  }  

}
