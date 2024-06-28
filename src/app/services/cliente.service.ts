import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  async searchClient(value: string){
    if (value.length > 3){
      const result = (await axios.get(`${apiUrl}/clientes/search?q=${value}`)).data?.rows;
      return result;
    } 
    
    return []
  }
}