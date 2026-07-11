import { Injectable } from "@angular/core";
import axios from "axios";
import { StorageService } from "./storage.service";

@Injectable({
   providedIn: "root",
})
export class DispenserService {
   constructor(private storageService: StorageService) {}

   /**
    * Genera una venta con bancard
    * @param type
    * @returns
    */
   async paymentWithBancard(type: string = "ux", payload: any) {
      try {
         const apiUrl = await this.storageService.get("MACHINE_HOST");
         const paymentUrl = await this.storageService.get("BANCARD_API_URL");

         const response = await axios.post(
            `${apiUrl}/dispensers/submit-bancard`,
            {
               ...payload,
               payment_url: paymentUrl,
            },
         );

         if (
            response.data?.message &&
            response?.data?.message == "No se pudo confirmar la venta"
         ) {
            throw response.data?.message;
         }

         return response.data;
      } catch (error: any) {
         console.error(error);

         const bancardMessage = error?.response?.data?.message ?? error;

         if (bancardMessage == "No se pudo confirmar la venta") {
            alert("No se pudo realizar la venta");
         } else {
            alert(error);
         }
      }
   }
}
