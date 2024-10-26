import { Component } from "@angular/core";
import { v4 as uuidv4 } from "uuid";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
   ModalController,
   AlertController,
   LoadingController,
} from "@ionic/angular";
import { ProductoTableModalComponent } from "../../../components/producto/producto-table-modal/producto-table-modal.component";
import { ProductoFormModalComponent } from "src/app/components/producto/producto-form-modal/producto-form-modal.component";
import { ClienteTableModalComponent } from "../../../components/cliente/cliente-table-modal/cliente-table-modal.component";
import { ProductoService } from "src/app/services/producto.service";
import { CompraService } from "src/app/services/compra.service";
import { StorageService } from "src/app/services/storage.service";

@Component({
   selector: "app-compra-form",
   templateUrl: "./compra-form.page.html",
   styleUrls: ["./compra-form.page.scss"],
})
export class CompraFormPage {
   compraForm: FormGroup;
   segmentValue: string;
   sumTotal = 0;

   toastComponent: any = {
      open: false,
      message: "",
   };

   productos: any[] = [];
   formaPagoList: any[] = [
      "Efectivo",
      "Tarjetas de Crédito",
      "Tarjetas de Débito",
      "Transferencias Bancarias",
      "Pagos Móviles",
      "Billeteras Digitales",
      "Pagos a Plazos",
      "Pagos Contra Reembolso",
   ];

   ciRuc: string = "";
   nombre: string = "";

   constructor(
      private modalController: ModalController,
      private loadingCtrl: LoadingController,
      private formBuilder: FormBuilder,
      private alertController: AlertController,
      private productoService: ProductoService,
      private compraService: CompraService, //private storageService: StorageService,}
      private storageService: StorageService,
   ) {
      this.compraForm = this.setCompraFormDefault();
      this.segmentValue = "formulario";
   }

   setSegmentValue(val: string) {
      this.segmentValue = val;
   }

   /**
    * Actualiza el formulario de compra a por defecto y tb el detalle
    * de productos
    * @returns
    */
   setCompraFormDefault() {
      this.productos = [];
      this.sumTotal = 0;

      return this.formBuilder.group({
         formaPago: [null, Validators.required],
         tipoVenta: [null, Validators.required],

         // campos para enviar a la compra
         fecha: [new Date().toISOString(), Validators.required],
         cliente_id: ["1", Validators.required],
         formapago_id: [1, Validators.required],
         condicion_venta: [1, Validators.required],

         observacion: [null, Validators.required],

         // campos para visualizacion en pantalla
         nombre: ["SIN NOMBRE", Validators.required],
         ci_ruc: ["00000000-0", Validators.required],
      });
   }

   setOpenToast(open: boolean = false, message: any = undefined) {
      this.toastComponent.open = open;

      if (message) this.toastComponent.message = message;
   }

   setCliente(ciRuc: string, nombre: string, clienteId: string | number) {
      this.compraForm.patchValue({
         ci_ruc: ciRuc,
         nombre: nombre,
         cliente_id: clienteId,
      });
   }

   /**
    * Abre el modal del cliente y al cerrar asigna el nombre del cliente y ci
    */
   async openClienteTableModal() {
      const modal = await this.modalController.create({
         component: ClienteTableModalComponent,
      });

      modal.onDidDismiss().then(async ({ data }) => {
         const cliente = data;
         if (cliente) {
            this.setCliente(
               cliente.ruc || cliente.ci,
               cliente.nombre,
               cliente.id,
            );
         }
      });
      await modal.present();
   }

   /**
    * Abre el model con el listado de productos
    */
   async openProductoTableModal() {
      const modal = await this.modalController.create({
         component: ProductoTableModalComponent,
      });

      modal.onDidDismiss().then(async (data) => {
         const producto = data?.data;
         this.productos = this.productoService.selectProductFromList(
            this.productos,
            producto,
         );
         this.sumTotal = this.productoService.setTotalOfList(this.productos);
      });
      await modal.present();
   }

   /**
    * Abre el modal con el listado de productos y al cerrar puede actualiza el detalle
    * @param producto
    */
   async openProductoFormModal(producto: any) {
      const modal = await this.modalController.create({
         component: ProductoFormModalComponent,
         componentProps: { producto },
      });

      modal.onDidDismiss().then(({ data }) => {
         const producto = data;

         if (producto) {
            this.productos = this.productoService.changeQuantityOfProduct(
               this.productos,
               producto,
            );
            this.sumTotal = this.productoService.setTotalOfList(this.productos);
         }
      });
      await modal.present();
   }

   /**
    * Elimina un detalle del producto asociado a la compra
    * @param producto
    */
   async removeProductoDetalle(productoIndex: number) {
      const alert = await this.alertController.create({
         header: "Confirmación",
         message: `¿Desea eliminar el producto?`,
         buttons: [
            {
               text: "Cancelar",
               role: "cancel",
               cssClass: "secondary",
               handler: () => {
                  console.log("Eliminación cancelada");
               },
            },
            {
               text: "Aceptar",
               handler: () => {
                  this.productos = this.productoService.removeProductFromList(
                     this.productos,
                     productoIndex,
                  );
                  this.sumTotal = this.productoService.setTotalOfList(
                     this.productos,
                  );
               },
            },
         ],
      });
      await alert.present();
   }

   /**
    * Envia un formulario y lo setea a por defecto
    */
   async compraFormSubmit() {
      const payload = {
         ...this.compraForm.value,
         detalle: this.productos,
      };
      try {
         if (this.sumTotal <= 0) throw "Subtotal no puede ser menos a cero";

         const alert = await this.alertController.create({
            header: "Confirmación",
            message: `¿Desea guardar la compra?
          ${payload?.nombre} - ${payload?.ci_ruc}
        `,
            buttons: [
               {
                  text: "Cancelar",
                  role: "cancel",
                  cssClass: "secondary",
                  handler: () => {
                     console.log("Eliminación cancelada");
                  },
               },
               {
                  text: "Aceptar",
                  handler: async () => {
                     const loading = await this.loadingCtrl.create({
                        message: "Enviando..",
                     });

                     // @todo uuidv4 debe generarse desde el create
                     loading.present();
                     payload.uuid = uuidv4();

                     await this.compraService.create(payload);
                     await this.storageService.set(
                        "compra/compra-list",
                        payload,
                     );

                     this.setOpenToast(true, "Compra creada");
                     this.compraForm = this.setCompraFormDefault();

                     loading.dismiss();
                  },
               },
            ],
         });

         await alert.present();
      } catch (error) {
         console.log(error);
         await this.storageService.set("compra/compra-list", payload);
         this.setOpenToast(
            true,
            "Problema de conexión. Compra guardada localmente.",
         );
      }
   }
}
