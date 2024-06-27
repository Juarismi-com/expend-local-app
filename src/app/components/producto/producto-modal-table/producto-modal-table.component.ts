import { Component, OnInit } from '@angular/core';
import { AlertController, AlertInput, ModalController } from '@ionic/angular';
import { productList } from 'src/app/mocks/productos.mock';
import { Producto } from 'src/app/interfaces/productos.interface';
import { removeAccents } from 'src/app/helpers/index.helper';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto-modal-table',
  templateUrl: './producto-modal-table.component.html',
  styleUrls: ['./producto-modal-table.component.scss'],
})
export class ProductoModalTableComponent implements OnInit {
  productos: any[] = [];
  productoSelected : any = null
  productoAdded = []

  constructor(
    private modalController: ModalController,
    private productoService: ProductoService,
    private alertController: AlertController
  ) { }
 
  ngOnInit() {
  }

  async handleInputSearch(e: any) {
    const value = e.target.value.toLowerCase();
    this.productos =  await this.productoService.searchProduct(value)
  }


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


  selectPriceOfProduct(e: any){
    this.productoSelected.precio_seleccionado = e?.value.toString()
  }


  async selectProduct(producto: any){
    this.productoSelected = producto;
    let openAlert = false;
    let prices = [
      this.inputRadioOptionForAlert(`${producto?.precio} - Normal`, producto.precio)
    ]

    // verifica si existe algun descuento
    if (producto?.fraccion != 0 && producto?.precio_fraccion != 0 ) {
      openAlert = true
      const precioFraccion = producto?.precio_fraccion;
      prices.push(
        this.inputRadioOptionForAlert(`${precioFraccion} - Fraccion`, precioFraccion)
      )
    }
    
    // verifica si existe alguna oferta
    if (producto?.ofertas.length > 0) {
      openAlert = true
      const lastIndex = producto.ofertas?.length;
      const oferta = producto.ofertas[lastIndex - 1]
    
      const valorDescuento = producto?.precio * parseFloat(oferta.descuento)  / 100;
      const precioDescuento = producto?.precio - valorDescuento
      
      prices.push(
        this.inputRadioOptionForAlert(`${precioDescuento} - Descuento (${oferta.descuento}) %`, precioDescuento)
      )
    }



    // Si se encontro descuento y 
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

  /*getPrecioCantidad1(): number {   
    const precioCantidad1 = producto.precios.find(precio => precio.cantidad === 1);    
    return precioCantidad1 ? precioCantidad1.precio_unitario : 0;
  }*/
   

  confirmProductSelected(producto: any){
    this.modalController.dismiss({
      codigo: producto.id,
      descripcion: producto.nombre,      
      precio: producto.precio_seleccionado,
      cantidad: 1,
      totalUnitario: producto.precio_seleccionado * 1
    });
  }

  
  closeModal() {
    this.modalController.dismiss();
  }  
}
