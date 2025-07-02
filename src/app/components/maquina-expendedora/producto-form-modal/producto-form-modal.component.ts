import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { ProductoService } from "src/app/services/producto.service";

@Component({
   selector: "app-producto-form-modal",
   templateUrl: "./producto-form-modal.component.html",
   styleUrls: ["./producto-form-modal.component.scss"],
})
export class ProductoFormModalComponent implements OnInit {
   ngOnInit() {}

   productoForm: FormGroup;

   constructor(
      private fb: FormBuilder,
      private modalCtrl: ModalController,
      private productoService: ProductoService,
      private toastController: ToastController,
   ) {
      this.productoForm = this.fb.group({
         nombre: ["", Validators.required],
         precio: [0, [Validators.required, Validators.min(0)]],
      });
   }

   async saveProduct() {
      if (this.productoForm.valid) {
         const result = await this.productoService.create(
            this.productoForm.value,
         );
         if (result) {
            this.showToast("Producto creado correctamente", "success");
            const datos = { result };
            this.modalCtrl.dismiss(datos);
         }
      }
   }

   closeModal() {
      this.modalCtrl.dismiss();
   }

   async showToast(message: string, color: string) {
      const toast = await this.toastController.create({
         message,
         duration: 1500,
         color,
         position: "bottom",
      });
      await toast.present();
   }
}
