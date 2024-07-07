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
    const user = this.storageService.get("usuario");    
    return user;
  }

}
