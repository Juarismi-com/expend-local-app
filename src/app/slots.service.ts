import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "src/environments/environment";

const { apiUrl } = environment;
@Injectable({
   providedIn: "root",
})
export class SlotsService {
   constructor() {}

   async getSlotByMaquinaId(maquina_id: string) {
      try {
         const response = await axios.get(
            `${apiUrl}/slots?maquina_id=${maquina_id}`,
         );
         return response.data;
      } catch (error) {
         console.error("Error al obtener listado:", error);
         return []; // Devuelve un array vacío en caso de error
      }
   }

   async updateSlot(id: Number, params: any) {
      try {
         const response = await axios.patch(`${apiUrl}/slots/${id}`, params);
         return response.data;
      } catch (error) {
         console.error("updateSlot()", error);
         return null;
      }
   }
}
