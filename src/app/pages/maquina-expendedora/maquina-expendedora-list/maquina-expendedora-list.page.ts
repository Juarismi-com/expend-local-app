import { Component, OnInit } from "@angular/core";
import { MaquinaExpendedoraService } from "src/app/services/maquina-expendedora.service";

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
}
