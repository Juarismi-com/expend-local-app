import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "src/environments/environment";

const { apiUrl } = environment;

@Injectable({
   providedIn: "root",
})
export class VentaService {
   constructor() {}

   async getVentas() {
      try {
         const response = await axios.get(`${apiUrl}/ventas`);
         return response.data.rows;
      } catch (error) {
         console.error("Error al obtener listado:", error);
         return []; // Devuelve un array vacío en caso de error
      }
   }

   async createVenta(params: any) {
      try {
         const response = await axios.post(`${apiUrl}/ventas`, params);
         return response;
      } catch (error: any) {
         console.error("Error al obtener listado:", error.response);

         throw error.response?.data?.message || "Algo salio mal";
      }
   }
}
