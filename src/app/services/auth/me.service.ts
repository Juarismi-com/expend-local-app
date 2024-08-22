import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class MeService {

  apiUrl = environment.apiUrl;

  constructor(private storageService: StorageService) { }

  async me() {    
    const user = await this.storageService.get("usuario");    
    return user;
  }

  async getVendedor() {    
    const user : any = await this.me();
    const vendedor_id = user?.vendedor?.id;
    return vendedor_id;
  }

  async getCliente() {    
    const user : any = await this.me();
    const cliente_id = user?.cliente?.id;
    return cliente_id;
  }
}
