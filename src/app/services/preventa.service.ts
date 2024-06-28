import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PreventaService {

  constructor(
    private storageService: StorageService
  ) { }


  /**
   * @todo add type for payload
   * @param payload 
   * @returns 
   */
  async create(payload: any){
    try {
      const user : any = await this.storageService.get("usuario")
      const vendedor_id = user?.vendedor?.id
      const result = await axios.post(`${environment.apiUrl}/preventas`, {
        ...payload,
        vendedor_id
      });
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll(){
    
  }

  async searchPreventa(value: string){
    if (value.length > 3){
      const result = (await axios.get(`${environment.apiUrl}/preventas?vendedor_id=${value}`)).data?.rows;
      return result;
    } 
    
    return []
  }

}
