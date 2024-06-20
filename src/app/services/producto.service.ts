import { Injectable } from '@angular/core';
import {productList} from "../mocks/productos.mock"
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
}
