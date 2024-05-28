import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { productList } from 'src/app/mocks/productos.mock';
import { Detalle_producto } from 'src/app/interfaces/productos.interface';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './producto-modal-form.component.html',
  styleUrls: ['./producto-modal-form.component.scss'],
})
export class ProductoModalFormComponent implements OnInit {
  productoForm: FormGroup;
  @Input() producto: Detalle_producto[] = [];

  codigo: string = '';
  descripcion: string = '';

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.productoForm = this.formBuilder.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [null, Validators.required],
      cantidad: [null, Validators.required],
      totalUnitario: [null, Validators.required],
    });
  }

  ngOnInit() {
    if (this.producto) {
      this.productoForm.patchValue(this.producto);     
    }
  }
 
  actualizar() {
    if (this.productoForm.valid) {
      this.modalController.dismiss(this.productoForm.value);
    }
  }

  cerrarModal() {
    this.modalController.dismiss();
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

    const totalUnitario = precio * cantidad; 

    this.productoForm.patchValue({
      precio: precio,
      totalUnitario: totalUnitario
    });
    
    return precio;
  }
  
}
