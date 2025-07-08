import { Component, OnInit } from "@angular/core";
import { MaquinaExpendedoraService } from "src/app/services/maquina-expendedora.service";
import axios from "axios";
import { environment } from "src/environments/environment";
const { apiUrl } = environment;

@Component({
   selector: "app-maquina-expendedora-list",
   templateUrl: "./maquina-expendedora-list.page.html",
   styleUrls: ["./maquina-expendedora-list.page.scss"],
})
export class MaquinaExpendedoraListPage implements OnInit {
   public results: any[] = [];

   constructor(private maquinaExpendedoraService: MaquinaExpendedoraService) {}

   async ngOnInit() {
      try {
         this.results =
            await this.maquinaExpendedoraService.getMaquinaExpendedoraList();
      } catch (error) {
         this.results = [];
      }
   }

   async onInputEtiquetaChange(event: any, id: number) {
      const newValue = event.detail.value;
      //this.results[index].value = newValue;

      await axios.patch(`${apiUrl}/maquinas/${id}`, {
         etiqueta: newValue,
      });
   }
}
