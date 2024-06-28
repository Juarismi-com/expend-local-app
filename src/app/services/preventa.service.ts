import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class PreventaService {

  constructor() { }

  async searchPreventa(value: string){
    if (value.length > 1){
      const result = (await axios.get(`${apiUrl}/preventas?vendedor_id=${value}`)).data?.rows;
      return result;
    } 
    
    return []
  }
}
