import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreventaService {

  constructor() { }


  /**
   * @todo add type for payload
   * @param payload 
   * @returns 
   */
  async create(payload: any){
    const result = await axios.post(`${environment.apiUrl}/preventas`, payload);
    return result;
  }

  async findAll(){
    
  }
}
