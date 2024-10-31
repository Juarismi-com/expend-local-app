import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "src/environments/environment";
import { formatPriceNumber } from "../helpers/index.helper";

const { apiUrl } = environment;

@Injectable({
   providedIn: "root",
})
export class ProductoService {
   constructor() {}

   async getProducts() {
      const result = (await axios.get(`${apiUrl}/productos`)).data;
      console.log(result);
      return result;
   }

   async searchProduct(value: string) {
      if (value.length > 3) {
         const result = (
            await axios.get(`${apiUrl}/productos/search?q=${value}`)
         ).data?.rows;
         return result;
      }

      return [];
   }

   /**
    * @todo agregar tipado a producto
    * Si NO existe el producto en el listado lo agrega, si existe setea el subtotal
    * y actualiza la cantidad
    * @param productoList
    * @param producto
    */
   selectProductFromList(productoList: any[] = [], producto: any) {
      if (producto) {
         const index = productoList.findIndex(
            (productoItem) =>
               producto?.producto_id == productoItem.producto_id &&
               // Solo para agregar al detalle con precio index
               producto?.precio_unitario == productoItem.precio_unitario,
         );

         if (index >= 0) {
            const productoSelected = productoList[index];
            productoList[index] = this.setSubtotal(
               productoSelected,
               ++productoSelected.cantidad,
            );
         } else {
            productoList.push(producto);
         }
      }

      return productoList;
   }

   /**
    * Cuando cambia la cantidad del producto
    * @param producto
    */
   changeQuantityOfProduct(productoList: any[] = [], producto: any) {
      if (producto) {
         const index = productoList.findIndex((productoItem) => {
            return (
               producto?.producto_id == productoItem.producto_id &&
               // Solo para agregar al detalle con precio index
               producto?.precio_unitario == productoItem.precio_unitario
            );
         });

         if (index >= 0) {
            productoList[index] = producto;
         }
      }

      return productoList;
   }

   setSubtotal(producto: any, cantidad: number) {
      const precioUnitario = producto.precio_unitario || 0;
      const subtotal = parseFloat(precioUnitario.toString()) * cantidad;
      producto = {
         ...producto,
         cantidad,
         subtotal,
      };

      return producto;
   }

   removeProductFromList(productoList: any[], productoIndex: number) {
      return productoList.filter((_, index) => index !== productoIndex);
   }

   /**
    * Asigna un label y valores de precios a todos los productos
    * @param producto
    * @returns
    */
   setListOfPrices(producto: any) {
      let tieneDescuentro = false;
      let tieneFraccion = false;
      let precioFraccion = 0;
      let oferta;
      let valorDescuento;
      let precioDescuento;

      // Agrega una lista de precios
      let prices = [
         {
            nombre: `Entero - ${formatPriceNumber(producto?.precio)}`,
            precio: parseFloat(producto.precio.toString()),
            descuento: 0,
            tipo_envase: "CJ",
         },
      ];

      // Si existe alguna oferta selecciona el valor y lo asigna
      if (producto?.ofertas.length > 0) {
         tieneDescuentro = true;
         const lastIndex = producto.ofertas?.length;
         oferta = producto.ofertas[lastIndex - 1];

         valorDescuento =
            (producto?.precio * parseFloat(oferta.descuento)) / 100;
         precioDescuento = producto?.precio - valorDescuento;

         console.log(oferta.descuento);

         prices.push({
            nombre: `Entero c/ Dto (${
               oferta.descuento
            }) % - ${formatPriceNumber(precioDescuento)}`,
            precio: precioDescuento,
            descuento: oferta.descuento,
            tipo_envase: "CJ",
         });
      }

      // Si existe el precio por fraccion o parte del producto lo agrega al listado
      if (producto?.fraccion != 0 && producto?.precio_fraccion != 0) {
         tieneFraccion = true;
         precioFraccion = producto?.precio_fraccion;
         prices.push({
            nombre: `Fraccion - ${formatPriceNumber(precioFraccion)}`,
            precio: precioFraccion,
            descuento: 0,
            tipo_envase: "FR",
         });
      }

      // Si existe descuento y fraccion, aplica un descuento al precio fraccion
      if (tieneDescuentro && tieneFraccion) {
         valorDescuento = (precioFraccion * parseFloat(oferta.descuento)) / 100;
         precioDescuento = precioFraccion - valorDescuento;
         prices.push({
            nombre: `Fraccion c/ Dto (${
               oferta.descuento
            }) % - ${formatPriceNumber(precioDescuento)} `,
            precio: precioDescuento,
            descuento: oferta.descuento,
            tipo_envase: "FR",
         });
      }

      return prices;
   }

   setTotalOfList(productoList: any[] = []) {
      let total = 0;
      for (let i = 0; i < productoList.length; i++) {
         const producto = productoList[i];
         total += parseFloat(producto.subtotal);
      }

      return total;
   }
}
