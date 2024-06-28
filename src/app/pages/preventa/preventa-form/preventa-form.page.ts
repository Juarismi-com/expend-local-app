import { Component, ComponentRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, AlertController, ModalOptions } from '@ionic/angular';
import { ProductoModalTableComponent } from '../../../components/producto/producto-modal-table/producto-modal-table.component';
import { ProductoModalFormComponent } from 'src/app/components/producto/producto-modal-form/producto-modal-form.component';
import { ClienteModalTableComponent } from '../../../components/cliente/cliente-modal-table/cliente-modal-table.component';
import { Detalle_producto } from 'src/app/interfaces/productos.interface';
import { StorageService } from 'src/app/services/storage.service';
import { ProductoService } from 'src/app/services/producto.service';
import { PreventaService } from 'src/app/services/preventa.service';

@Component({
  selector: 'app-preventa-form',
  templateUrl: './preventa-form.page.html',
  styleUrls: ['./preventa-form.page.scss'],
})
export class PreventaFormPage {

  preventaForm: FormGroup;

  toastComponent: any =  {
    open: false,
    message: ''
  }

  productos: any[] = [];
  formaPagoList: any[] = [
      "Efectivo",
      "Tarjetas de Crédito",
      "Tarjetas de Débito",
      "Transferencias Bancarias",
      "Pagos Móviles",
      "Billeteras Digitales",
      "Pagos a Plazos",
      "Pagos Contra Reembolso"
  ]

  ciRuc: string = '';
  nombre: string = '';


  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private productoService: ProductoService,
    private preventaService: PreventaService,
    //private storageService: StorageService,
  ) {
    this.preventaForm = this.setPreventaFormDefault()
  }
 


  ngOnInit() {
    
  }

  /**
   * Actualiza el formulario de preventa a por defecto y tb el detalle 
   * de productos
   * @returns 
   */
  setPreventaFormDefault(){
    this.productos = [];

    return this.formBuilder.group({
      formaPago: [null, Validators.required],
      tipoVenta: [null, Validators.required],

      // campos para enviar a la preventa
      fecha: [(new Date).toISOString(), Validators.required],
      cliente_id: ['1', Validators.required],
      formapago_id: [1, Validators.required],
      condicion_venta: [1, Validators.required],

      observacion: [null, Validators.required],

      // campos para visualizacion en pantalla
      nombre: ['SIN NOMBRE', Validators.required],
      ci_ruc: ['00000000-0', Validators.required],
    });  
  }

  setOpenToast(open: boolean = false, message: any = undefined){
    this.toastComponent.open = open;

    if (message) 
      this.toastComponent.message = message
  }

  /**
   * Abre el modal del cliente y al cerrar asigna el nombre del cliente y ci
   */
  async openClienteTableModal() {
    const modal = await this.modalController.create({
      component: ClienteModalTableComponent,
    });

    modal.onDidDismiss().then(async ({data}) => {
      if (data) {
        const cliente = data;
        if (cliente) {         
          console.log(cliente);
          if (cliente) {         
            
            this.preventaForm.patchValue({
              ci_ruc: cliente.ruc || cliente.ci,
              nombre: cliente.nombre,
              cliente_id: cliente.id
            });
          }     

        }
      }
    });
    await modal.present();
  }
 

  /**
   * Abre el model con el listado de productos
   */
  async openProductoTableModal() {
    const modal = await this.modalController.create({
      component: ProductoModalTableComponent,
    });
    
    modal.onDidDismiss().then(async (data) => {
      const producto = data?.data;
      this.productos = this.productoService.selectProductFromList(this.productos, producto)
      
      
      // todo migrarlo a un service PreventaService
      /*this.storageService.set("preventa/preventa-form", {
        ...this.preventaForm.value,
        productos: this.productos
      })*/
    });
    console.log(this.preventaForm);
    await modal.present();
  }

  /**
   * Abre el modal con el listado de productos y al cerrar puede ven
   * @param producto 
   */
  async openProductoFormModal(producto: any) {
    const modal = await this.modalController.create({
      component: ProductoModalFormComponent,
      componentProps: { producto }
    });    

    modal.onDidDismiss().then(({data}) => {
      const producto = data

      if (producto) {
        this.productos = this.productoService.changeQuantityOfProduct(
          this.productos, producto
        );
      }
    });
    await modal.present();
  }


  /**
   * Elimina un detalle del producto asociado a la preventa
   * @param producto 
   */
  async removeProductoDetalle(producto: any) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: `¿Está seguro de que desea eliminar el producto?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.productos = this.productoService.remoteProductFromList(this.productos, producto);
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * Envia un formulario y lo setea a por defecto
   */
  async preventaFormSubmit() {
    try {
      console.log(this.preventaForm.value);

      const payload = {
        ...this.preventaForm.value,
        detalle: this.productos
      }

      console.log(payload);

      await this.preventaService.create(payload);
      this.setOpenToast(true, "Prenventa creada")
      this.preventaForm = this.setPreventaFormDefault();
    } catch (error) {
      console.log(error);
      this.setOpenToast(true, "Prenventa no creada")
    }
    
    //this.storageService.set*this.preventaForm.value

    /*const preventaList = await this.storageService.get("preventa/preventa-list") || [];
    const preventaForm = await this.storageService.get("preventa/preventa-form");
    preventaList.push(preventaForm);
    
    this.storageService.set("preventa/preventa-list", preventaList);*/


  }
}
