import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto-form-modal',
  templateUrl: './producto-form-modal.component.html',
  styleUrls: ['./producto-form-modal.component.scss'],
})
export class ProductoModalFormComponent implements OnInit {
  productoForm: FormGroup;
  @Input() producto: any;
  imagen: string = 'http://localhost:4200/assets/imagen-default.jpeg';

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
      tipo_envase: ['CJ', Validators.required]
    });
  }

  ngOnInit() {
    if (this.producto) {
      this.productoForm.patchValue(this.producto);
    }
  }
 
  formSubmit() {
    if (this.productoForm.valid) {
      delete this.producto['id'];

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
    const i = e.target.value;
    const precioSeleccionado = this.producto.precio_lista[i]
    this.producto.precio_seleccionado = precioSeleccionado.precio
    this.productoForm.patchValue({
      precio_unitario: precioSeleccionado.precio,
      descuento: precioSeleccionado.descuento,
      tipo_envase: precioSeleccionado.tipo_envase
    })
    this.setSubtotal();
  }

}
