import { Injectable } from '@angular/core';
import {productList} from "../mocks/productos.mock"

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor() { }

  searchProduct(value: string){
   const data = productList();

   return data.filter((d) => {
      return d.codigo.toLowerCase().indexOf(value) > -1 || d.nombre.toLowerCase().indexOf(value) > -1
   });
  }
}
