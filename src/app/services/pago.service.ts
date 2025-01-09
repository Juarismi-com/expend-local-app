import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "src/environments/environment";

const { apiUrl } = environment;

@Injectable({
   providedIn: "root",
})
export class PagoService {
   constructor() {}

   async getPayments() {
      try {
         const response = await axios.get(`${apiUrl}/pagos`);
         console.log("++++" + response.data);
         return response.data.items;
      } catch (error) {
         console.error("Error al obtener pagos:", error);
         return []; // Devuelve un array vacío en caso de error
      }
   }

   async searchPayment(value: string) {
      try {
         // if (value.length > 3) {
         const result = (await axios.get(`${apiUrl}/pagos/search?q=${value}`))
            .data?.rows;
         return result;
         // }
      } catch (error) {
         return []; // Devuelve un array vacío en caso de error
      }
   }
}
