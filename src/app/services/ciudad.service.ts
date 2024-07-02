import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  
  async getCiudadesPorDepartamento(id: number){    
    const res =
    await axios.get(`${environment.apiUrl}/ciudades?departamento_id=${id}`);
    return res.data;
  }

  constructor() { }
}
