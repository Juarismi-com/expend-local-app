import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

   async getDepartamentos(){    
    const res =
    await axios.get(`${environment.apiUrl}/departamentos`);
    return res.data;
  }

  constructor() { }
}
