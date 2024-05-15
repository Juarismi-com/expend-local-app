import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.page.html',
  styleUrls: ['./producto-list.page.scss'],
})
export class ProductoListPage  {

  public results: any[] = [];
  public variantByCantSelected: any = null;

  handleInput(e : any) {
    const value = e.target.value.toLowerCase();
    this.results = this.productoService.searchProduct(value)
  }

  constructor(
   private productoService: ProductoService,
   private alertController: AlertController
  ) { }
 
  async viewMoreDetailsProducts(product: any){

      const optionsProducts = product.precios.map((precio:any) => {
         return {
            type: "radio",
            label: `${precio.cantidad} x ${precio.precio_unitario}`,
            handler: (e:any) => {
               this.variantByCantSelected = JSON.stringify(e)
            }
         }
      })


      const alert = await this.alertController.create({
         header: "Precios por cantidad",
         inputs: [...optionsProducts],
         buttons: [{
            text: "Salir"
         }]
      })

      await alert.present()
  }
}
