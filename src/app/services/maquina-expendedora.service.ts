import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "src/environments/environment";

const { apiUrl } = environment;

@Injectable({
   providedIn: "root",
})
export class MaquinaExpendedoraService {
   constructor() {}

   async getMaquinaExpendedoraList() {
      try {
         const response = await axios.get(`${apiUrl}/maquinas`);
         return response.data;
      } catch (error) {
         console.error("Error al obtener listado:", error);
         return []; // Devuelve un array vacío en caso de error
      }
   }
}
