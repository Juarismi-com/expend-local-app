import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { productList } from 'src/app/mocks/productos.mock';
import { Detalle_producto } from 'src/app/interfaces/productos.interface';
import { ProductoService } from 'src/app/services/producto.service';
import { formatPriceNumber } from 'src/app/helpers/index.helper';

@Component({
  selector: 'app-producto-form-modal',
  templateUrl: './producto-form-modal.component.html',
  styleUrls: ['./producto-form-modal.component.scss'],
})
export class ProductoModalFormComponent implements OnInit {
  productoForm: FormGroup;
  @Input() producto: any;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private productoService: ProductoService
  ) {
    this.productoForm = this.formBuilder.group({
      producto_id: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio_unitario: [null, Validators.required],
      cantidad: [null, Validators.required],
      descuento: [0],
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
      const producto = {
        ...this.producto,
        ...this.productoForm.value
      }
      this.modalController.dismiss(producto);
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

  /**
   * Selecciona el precio cuando un producto tiene varios precios
   * @param e 
   */
  selectPriceOfProduct(e:any){
    const precioSeleccionado = e.target.value;
    this.producto.precio_seleccionado = precioSeleccionado.precio
    this.productoForm.patchValue({
      precio_unitario: precioSeleccionado.precio,
      descuento: precioSeleccionado.descuento
    })
    this.setSubtotal();
  }

}
