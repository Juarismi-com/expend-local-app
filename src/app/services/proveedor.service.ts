import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  async searchProveedor(value: string) {
    if (value.length > 3) {
      const result = (
        await axios.get(`${apiUrl}/proveedores/search?q=${value}`)
      ).data?.rows;
      return result;
    }

    return [];
  }

  async searchProductosByProveedorId(proveedorId: number) {
    try {
      const res = await axios.get(
        `${environment.apiUrl}/proveedores/${proveedorId}/productos`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async searchProducto(value: string) {
    const result = (await axios.get(`${apiUrl}/productos/search?q=${value}`))
      .data?.rows;
    return result;
  }

  constructor() {}
}
