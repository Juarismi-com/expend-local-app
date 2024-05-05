import { Component } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.page.html',
  styleUrls: ['./producto-list.page.scss'],
})
export class ProductoListPage  {

  public results: any[] = [];

  handleInput(e : any) {
    const value = e.target.value.toLowerCase();
    this.results = this.productoService.searchProduct(value)
  }

  constructor(
   private productoService: ProductoService
  ) { }

  
  //ngOnInit(){}
}
