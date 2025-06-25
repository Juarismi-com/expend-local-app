import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductoService } from "src/app/services/producto.service";
import { SlotsService } from "src/app/slots.service";

@Component({
   selector: "app-slot-crud",
   templateUrl: "./slot-crud.component.html",
   styleUrls: ["./slot-crud.component.scss"],
})
export class SlotCrudComponent implements OnInit {
   @Input() maquinaId?: string;

   slots: any[] = [];
   productos: any[] = [];
   slotForms: FormGroup[] = [];
   constructor(
      private slotService: SlotsService,
      private fb: FormBuilder,
      private productoService: ProductoService,
   ) {}

   async ngOnInit() {
      if (this.maquinaId) {
         this.slots = await this.slotService.getSlotByMaquinaId(this.maquinaId);
         this.productos = await this.productoService.getProducts();
         this.slots.forEach((slot) => {
            const form = this.fb.group({
               producto_id: [slot.producto_id || null, Validators.required],
               precio: [slot?.precio, [Validators.required, Validators.min(0)]],
               precio_oferta: [
                  slot.precio_oferta,
                  [Validators.required, Validators.min(0)],
               ],
               stock: [slot.stock, [Validators.required, Validators.min(0)]],
               stock_minimo: [
                  slot.stock_minimo,
                  [Validators.required, Validators.min(0)],
               ],
               stock_inicial: [
                  slot.stock_inicial,
                  [Validators.required, Validators.min(0)],
               ],
            });
            this.slotForms.push(form);
         });
      }
   }

   async setSlot(index: number) {
      try {
         if (this.slotForms[index].valid) {
            const slotId = this.slots[index].id;
            const data = this.slotForms[index].value;

            await this.slotService.updateSlot(slotId, data);
            alert("Actualizado correctamente");
         }
      } catch (error) {
         alert("No se pudo actualizar");
      }
   }
}
