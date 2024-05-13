import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoModalTableComponent } from '../producto-modal-table/producto-modal-table.component';

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
  productoCodigoInput: string = "";
  productoDesInput: string = "";

  codigo: number = 0;
  descripcion: string = '';
  precio: number = 0;
  cantidad: number = 0;
  totalProducto: number = 0;  

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.productoForm = this.formBuilder.group({
      codigo: [null, Validators.required],
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
      component: ProductoModalTableComponent
    });
    modal.onDidDismiss().then(data => {
      const productoCodigo = data?.data?.codigo;
      const productoDes = data?.data?.descripcion;
      if (productoCodigo) {        
        this.productoCodigoInput = productoCodigo;
        this.productoDesInput = productoDes;
      }
    });
    await modal.present();
  }

  agregarProductoEnTabla() {
    if (this.productoForm.valid) {
      const producto: Producto = {
        codigo: this.productoForm.value.codigo,
        descripcion: this.productoForm.value.descripcion,
        precio: this.productoForm.value.precio,
        cantidad: this.productoForm.value.cantidad,
        totalProducto: this.productoForm.value.totalProducto        
      };
      this.productos.push(producto);
      this.productoForm.reset();
    }
  }
  
}