import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "src/environments/environment";
import { StorageService } from "./storage.service";
import { MeService } from "src/app/services/auth/me.service";

@Injectable({
   providedIn: "root",
})
export class PreventaService {
   constructor(
      private storageService: StorageService,
      private meService: MeService,
   ) {}

   getPreventasDelMes = async (startDate: string, endDate: string) => {
      try {
         const vendedor_id = await this.meService.getVendedor();
         const res = await axios.get(
            `${environment.apiUrl}/preventas?startDate=${startDate}&endDate=${endDate}&vendedor_id=${vendedor_id}`,
         );
         return res.data.count;
      } catch (error) {
         console.log(error);
         throw error;
      }
   };

   getTotalPreventas = async () => {
      try {
         const vendedor_id = await this.meService.getVendedor();
         const res = await axios.get(
            `${environment.apiUrl}/preventas?vendedor_id=${vendedor_id}`,
         );
         return res.data.count;
      } catch (error) {
         console.log(error);
         throw error;
      }
   };

   /**
    * @todo add type for payload
    * @param payload
    * @returns
    */
   async create(payload: any) {
      try {
         const user: any = await this.storageService.get("usuario");
         const vendedor_id = user?.vendedor?.id;
         const result = await axios.post(`${environment.apiUrl}/preventas`, {
            ...payload,
            vendedor_id,
         });
         return result;
      } catch (error) {
         console.log(error);
         throw error;
      }
   }

   /**
    * Retorna el detalle de una preventa
    * @param preventaId
    * @returns
    */
   async getPreventaDetail(preventaId: number | string) {
      const result = await axios.get(
         `${environment.apiUrl}/preventas/${preventaId}`,
      );
      return result?.data;
   }

   async findAll() {}

   async searchPreventa(value: string) {
      if (value.length > 3) {
         const result = (
            await axios.get(
               `${environment.apiUrl}/preventas?vendedor_id=${value}`,
            )
         ).data?.rows;
         return result;
      }

      return [];
   }

   async getPreventaByVendedorId(vendedorId: string | number) {
      const result = (
         await axios.get(
            `${environment.apiUrl}/preventas?vendedor_id=${vendedorId}`,
         )
      ).data?.rows;
      console.log(result);
      return result;
   }

   async getRecentPreventasByVendedorId(vendedorId: string | number) {
      const result: any[] = await this.storageService.get(
         "preventa/preventa-list",
      );

      const today = new Date();
      const oneWeekAgo: Date = new Date(today);

      oneWeekAgo.setDate(today.getDate() - 7);

      const preventasByVendedor = result.filter((preventa: any) => {
         return preventa.vendedor_id === vendedorId;
      });

      const recentPreventas = preventasByVendedor.filter((preventa: any) => {
         const preventaDate = new Date(preventa.fecha);
         return preventaDate >= oneWeekAgo;
      });

      return recentPreventas;
   }
}
