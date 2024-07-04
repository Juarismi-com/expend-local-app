import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor() { }

  async searchProduct(value: string){
    if (value.length > 3){
      const result = (await axios.get(`${apiUrl}/productos/search?q=${value}`)).data?.rows;
      return result;
    } 
    
    return []
  }

  /**
   * @todo agregar tipado a producto
   * Si NO existe el producto en el listado lo agrega, si existe setea el subtotal
   * y actualiza la cantidad
   * @param producto 
   */
  selectProductFromList(productoList : any[] = [], producto: any){
    if (producto){
      const index = productoList.findIndex(productoItem => 
        producto?.producto_id == productoItem.producto_id
      );

      if (index >= 0){
        const productoSelected = productoList[index];
        productoList[index] = this.setSubtotal(
          productoSelected, 
          ++productoSelected.cantidad
        );

      } else {
        productoList.push(producto);
      }
    }

    return productoList;
  }

  /**
   * Cuando cambia la cantidad del producto
   * @param producto 
   */
  changeQuantityOfProduct(productoList : any[] = [], producto: any){
    if (producto){
      const index = productoList.findIndex(productoItem => 
        producto?.producto_id == productoItem.producto_id
      );

      if (index >= 0){
        productoList[index] = producto
      }
    }

    return productoList;
  }


  setSubtotal(producto: any, cantidad: number){
    const subtotal = parseFloat(producto.precio_unitario.toString()) * cantidad;
    producto = {
      ...producto,
      cantidad, 
      subtotal
    }

    return producto;
  }

  remoteProductFromList(productoList: any[], producto: any){
    return productoList.filter(p => p.producto_id !== producto.producto_id);
  }
}
