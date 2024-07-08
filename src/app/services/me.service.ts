import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class MeService {

  apiUrl = environment.apiUrl;

  constructor(private storageService: StorageService) { }

  async getVendedor() {    
    const user : any = await this.storageService.get("usuario");
    const vendedor_id = user?.vendedor?.id;
    return vendedor_id;
  }

  async getCliente() {    
    const user : any = await this.storageService.get("usuario");
    const cliente_id = user?.cliente?.id;
    return cliente_id;
  }
}
