import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "src/environments/environment";
import { StorageService } from "./storage.service";
import { MeService } from "src/app/services/auth/me.service";

@Injectable({
   providedIn: "root",
})
export class CompraService {
   constructor(
      private storageService: StorageService,
      private meService: MeService,
   ) {}

   getComprasDelMes = async (startDate: string, endDate: string) => {
      try {
         const vendedor_id = await this.meService.getVendedor();
         const res = await axios.get(
            `${environment.apiUrl}/compras?startDate=${startDate}&endDate=${endDate}&vendedor_id=${vendedor_id}`,
         );
         return res.data.count;
      } catch (error) {
         console.log(error);
         throw error;
      }
   };

   getTotalCompras = async () => {
      try {
         const vendedor_id = await this.meService.getVendedor();
         const res = await axios.get(
            `${environment.apiUrl}/compras?vendedor_id=${vendedor_id}`,
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
         const result = await axios.post(`${environment.apiUrl}/compras`, {
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
    * Retorna el detalle de una compra
    * @param compraId
    * @returns
    */
   async getCompraDetail(compraId: number | string) {
      const result = await axios.get(
         `${environment.apiUrl}/compras/${compraId}`,
      );
      return result?.data;
   }

   async findAll() {}

   async searchCompra(value: string) {
      if (value.length > 3) {
         const result = (
            await axios.get(
               `${environment.apiUrl}/compras?vendedor_id=${value}`,
            )
         ).data?.rows;
         return result;
      }

      return [];
   }

   async getCompraByVendedorId(vendedorId: string | number) {
      const result = (
         await axios.get(
            `${environment.apiUrl}/compras?vendedor_id=${vendedorId}`,
         )
      ).data?.rows;
      console.log(result);
      return result;
   }

   async getRecentComprasByVendedorId(vendedorId: string | number) {
      const result: any[] = await this.storageService.get("compra/compra-list");

      const today = new Date();
      const oneWeekAgo: Date = new Date(today);

      oneWeekAgo.setDate(today.getDate() - 7);

      const comprasByVendedor = result.filter((compra: any) => {
         return compra.vendedor_id === vendedorId;
      });

      const recentCompras = comprasByVendedor.filter((compra: any) => {
         const compraDate = new Date(compra.fecha);
         return compraDate >= oneWeekAgo;
      });

      return recentCompras;
   }
}
