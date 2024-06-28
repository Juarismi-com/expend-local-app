import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { productList } from 'src/app/mocks/productos.mock';
import { Detalle_producto } from 'src/app/interfaces/productos.interface';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './producto-modal-form.component.html',
  styleUrls: ['./producto-modal-form.component.scss'],
})
export class ProductoModalFormComponent implements OnInit {
  productoForm: FormGroup;
  @Input() producto: Detalle_producto[] = [];

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private productoService: ProductoService
  ) {
    this.productoForm = this.formBuilder.group({
      producto_id: ['', Validators.required],
      nombre: ['', Validators.required],
      precio_unitario: [null, Validators.required],
      cantidad: [null, Validators.required],
      descuento: [null, Validators.required],
      subtotal: [null, Validators.required],
    });
  }

  ngOnInit() {
    if (this.producto) {
      this.productoForm.patchValue(this.producto);     
    }
  }
 
  formSubmit() {
    if (this.productoForm.valid) {
      this.modalController.dismiss(this.productoForm.value);
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }
 

  setSubtotal(){
    const producto = this.productoService.setSubtotal(
      this.productoForm.value, 
      this.productoForm.value?.cantidad
    );
    this.productoForm.setValue({...producto})
  }

}
