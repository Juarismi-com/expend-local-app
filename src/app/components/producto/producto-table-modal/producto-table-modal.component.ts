import { Component } from '@angular/core';
import { AlertController, AlertInput, ModalController } from '@ionic/angular';
//import { removeAccents } from 'src/app/helpers/index.helper';
import { ProductoService } from 'src/app/services/producto.service';
//import { ProductoModalFormComponent } from '../producto-modal-form/producto-modal-form.component';

@Component({
  selector: 'app-producto-table-modal',
  templateUrl: './producto-table-modal.component.html',
  styleUrls: ['./producto-table-modal.component.scss'],
})
export class ProductoModalTableComponent {
  productos: any[] = [];
  productoSelected : any = null
  productoAdded = []

  constructor(
    private modalController: ModalController,
    private productoService: ProductoService,
    private alertController: AlertController
  ) { }
 

  async handleInputSearch(e: any) {
    const value = e.target.value.toLowerCase();
    this.productos =  await this.productoService.searchProduct(value)
  }


  /**
   * Genera un input radio para una alert
   * @param label 
   * @param value 
   * @returns 
   */
  inputRadioOptionForAlert(label: string, value: string|Number){
    return {
      type: "radio",
      label,
      value,
      handler: (e:any) => {
        this.selectPriceOfProduct(e);
      }
    } as AlertInput
  }


  /**
   * Selecciona el precio cuando un producto tiene varios precios
   * @param e 
   */
  selectPriceOfProduct(e: any){
    this.productoSelected.precio_seleccionado = e?.value.toString()
  }


  /**
   * Agrega todos los precios posible al alert
   * @param producto 
   */
  private setPricesToProductAlert(producto: any) {
    let openAlert = false;
    let tieneDescuentro = false;
    let tieneFraccion = false;
    let precioFraccion = 0;
    let valorDescuento;

    // Agrega una lista de precios
    let prices = [
      this.inputRadioOptionForAlert(`${producto?.precio} - Entero`, producto.precio)
    ]

    // Si existe alguna oferta selecciona el valor y lo asigna
    if (producto?.ofertas.length > 0) {
      openAlert = true
      tieneDescuentro = true;
      const lastIndex = producto.ofertas?.length;
      const oferta = producto.ofertas[lastIndex - 1]
    
      const valorDescuento = producto?.precio * parseFloat(oferta.descuento)  / 100;
      const precioDescuento = producto?.precio - valorDescuento
      
      prices.push(
        this.inputRadioOptionForAlert(`${precioDescuento} - Entero c/ Dto (${oferta.descuento}) %`, precioDescuento)
      )
    }

    // Si existe el precio por fraccion o parte del producto lo agrega al listado
    if (producto?.fraccion != 0 && producto?.precio_fraccion != 0 ) {
      openAlert = true
      tieneFraccion = true
      precioFraccion = producto?.precio_fraccion;
      prices.push(
        this.inputRadioOptionForAlert(`${precioFraccion} - Fraccion`, precioFraccion)
      )
    }

    // Si existe descuento y fraccion, aplica un descuento al precio fraccion
    if (tieneDescuentro && tieneFraccion){
      /*const precioFraccionDescuento =  
      const valorDescuento = precioFraccionDescuento * parseFloat(oferta.descuento)  / 100;
      prices.push(
        this.inputRadioOptionForAlert(`${precioFraccion} - Fraccion c/ Dto`, precioFraccion)
      )*/
     console.log("precio descuento");
    }

    return { prices, openAlert }
  }
  

  /**
   * Selecciona un producto
   * Agrega una lista de precio
   * @param producto 
   */
  async selectProduct(producto: any){
    this.productoSelected = producto;
    
    const { openAlert, prices } = this.setPricesToProductAlert(producto)

    if (openAlert) {
      const alert = await this.alertController.create({
          header: "Precios",
          inputs: [
            ...prices, 
          ],
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: (e: any) => {
                console.log('Alert canceled');
              },
            },
            {
              text: 'Seleccionar',
              role: 'confirm',
              handler: (e: any) => {
                this.confirmProductSelected(this.productoSelected)
              },
            },
          ]
      })

      await alert.present()
    }
  }

  /**
   * Confirma la seccion y lo retorna con el modal
   * @param producto 
   */
  confirmProductSelected(producto: any){
    const precioSeleccionado = parseFloat(producto.precio_seleccionado.toString());
    let descuento = 0;

    if (producto?.ofertas?.length > 0){
      descuento = producto?.ofertas[0].descuento;
    }    

    this.modalController.dismiss({
      "nombre": producto.nombre,
      "producto_id": producto.id,
      "precio_unitario": precioSeleccionado,
      "descuento": parseFloat(descuento.toString()),
      "cantidad": 1,
      "subtotal": precioSeleccionado
    })
  }

  
  closeModal() {
    this.modalController.dismiss();
  }  
}
