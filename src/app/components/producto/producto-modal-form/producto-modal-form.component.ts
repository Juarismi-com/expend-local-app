import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoModalTableComponent } from '../producto-modal-table/producto-modal-table.component';
import { productList } from 'src/app/mocks/productos.mock';

interface Producto {
  codigo: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  totalProducto: number;
}

@Component({
  selector: 'app-modal-producto',
  templateUrl: './producto-modal-form.component.html',
  styleUrls: ['./producto-modal-form.component.scss'],
})
export class ProductoModalFormComponent {
  productoForm: FormGroup;
  productos: Producto[] = [];
  productoSeleccionado: Producto[] = [];

  codigo: string = '';
  descripcion: string = '';
  precio: number = 0;
  cantidad: number = 0;
  totalProducto: number = 0;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.productoForm = this.formBuilder.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [null, Validators.required],
      cantidad: [null, Validators.required],
      totalProducto: [null, Validators.required],
    });
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  async abrirProductoModalTabla() {
    const modal = await this.modalController.create({
      component: ProductoModalTableComponent,
    });
    modal.onDidDismiss().then((data) => {
      const producto = data?.data;
      if (producto) {
        this.productoSeleccionado = producto;
        this.productoForm.patchValue({
          codigo: producto.codigo,
          descripcion: producto.descripcion,
        });
      }
    });
    await modal.present();
  }

  calcularPrecioPorCantidad() {
    const codigo = this.productoForm.value.codigo;
    const cantidad = this.productoForm.value.cantidad;

    const productoSeleccionado = productList().find(
      (producto) => producto.codigo === codigo
    );

    if (!productoSeleccionado) {
      return 0;
    }

    const precios = productoSeleccionado?.precios;

    let precio = 0;
    for (const p of precios) {
      if (cantidad >= p.cantidad) {
        precio = p.precio_unitario;
      }
    }

    const totalProducto = precio * cantidad; 

    this.productoForm.patchValue({
      precio: precio,
      totalProducto: totalProducto
    });

    this.productoForm.patchValue({
      precio: precio
    });

    return precio;
  }

  agregarProductoEnTabla() {
    if (this.productoForm.valid) {
      const producto: Producto = {
        codigo: this.productoForm.value.codigo,
        descripcion: this.productoForm.value.descripcion,
        precio: this.productoForm.value.precio,
        cantidad: this.productoForm.value.cantidad,
        totalProducto: this.productoForm.value.totalProducto,
      };

      //Validation
      const existe = this.productos.some((p) => p.codigo === producto.codigo);
      if (!existe) {
        this.productos.push(producto);
        this.productoForm.reset();
      } else {
        console.error('El producto ya existe en la lista.');
      }
    } else {
      console.error('Por favor, complete el formulario correctamente.');
    }
  }
}
