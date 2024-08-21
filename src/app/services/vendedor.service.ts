import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root',
})
export class VendedorService {
  constructor() {}

  async getVendedor() {
    const result = (await axios.get(`${apiUrl}/vendedores`)).data;
    return result.sort((a: any, b: any) =>
      a.nombre.trim().localeCompare(b.nombre.trim())
    );
  }

  async searchVendedor(value: string) {
    if (value.length > 3) {
      const result = (await axios.get(`${apiUrl}/vendedores/search?q=${value}`))
        .data?.rows;
      return result;
    }

    return [];
  }
}
