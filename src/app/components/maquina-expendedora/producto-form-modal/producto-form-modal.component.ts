import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";

@Component({
   selector: "app-producto-form-modal",
   templateUrl: "./producto-form-modal.component.html",
   styleUrls: ["./producto-form-modal.component.scss"],
})
export class ProductoFormModalComponent implements OnInit {
   ngOnInit() {}

   productoForm: FormGroup;

   constructor(private fb: FormBuilder, private modalCtrl: ModalController) {
      this.productoForm = this.fb.group({
         nombre: ["", Validators.required],
         precio: [0, [Validators.required, Validators.min(0)]],
      });
   }

   saveProduct() {
      if (this.productoForm.valid) {
         console.log("Producto:", this.productoForm.value);
         // Aquí puedes agregar lógica para enviar el formulario
      }
   }

   closeModal() {
      this.modalCtrl.dismiss();
   }
}
