import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "src/environments/environment";
import { StorageService } from "./storage.service";
import { MeService } from "src/app/services/auth/me.service";

@Injectable({
   providedIn: "root",
})
export class VentaService {
   constructor(
      private storageService: StorageService,
      private meService: MeService,
   ) {}

   getVentasDelMes = async (startDate: string, endDate: string) => {
      try {
         const vendedor_id = await this.meService.getVendedor();
         const res = await axios.get(
            `${environment.apiUrl}/ventas?startDate=${startDate}&endDate=${endDate}&vendedor_id=${vendedor_id}`,
         );
         return res.data.count;
      } catch (error) {
         console.log(error);
         throw error;
      }
   };

   getTotalVentas = async () => {
      try {
         const vendedor_id = await this.meService.getVendedor();
         const res = await axios.get(
            `${environment.apiUrl}/ventas?vendedor_id=${vendedor_id}`,
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
         const result = await axios.post(`${environment.apiUrl}/ventas`, {
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
    * Retorna el detalle de una venta
    * @param ventaId
    * @returns
    */
   async getVentaDetail(ventaId: number | string) {
      const result = await axios.get(`${environment.apiUrl}/ventas/${ventaId}`);
      return result?.data;
   }

   async findAll() {}

   async searchVenta(value: string) {
      if (value.length > 3) {
         const result = (
            await axios.get(`${environment.apiUrl}/ventas?vendedor_id=${value}`)
         ).data?.rows;
         return result;
      }

      return [];
   }

   async getVentaByVendedorId(vendedorId: string | number) {
      const result = (
         await axios.get(
            `${environment.apiUrl}/ventas?vendedor_id=${vendedorId}`,
         )
      ).data?.rows;
      console.log(result);
      return result;
   }

   async getRecentVentasByVendedorId(vendedorId: string | number) {
      const result: any[] = await this.storageService.get("venta/venta-list");

      const today = new Date();
      const oneWeekAgo: Date = new Date(today);

      oneWeekAgo.setDate(today.getDate() - 7);

      const ventasByVendedor = result.filter((venta: any) => {
         return venta.vendedor_id === vendedorId;
      });

      const recentVentas = ventasByVendedor.filter((venta: any) => {
         const ventaDate = new Date(venta.fecha);
         return ventaDate >= oneWeekAgo;
      });

      return recentVentas;
   }
}
