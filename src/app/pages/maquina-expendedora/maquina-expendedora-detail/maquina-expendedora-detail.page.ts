import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
   selector: "app-maquina-expendedora-detail",
   templateUrl: "./maquina-expendedora-detail.page.html",
   styleUrls: ["./maquina-expendedora-detail.page.scss"],
})
export class MaquinaExpendedoraDetailPage implements OnInit {
   maquinaId: any;
   constructor(private route: ActivatedRoute) {}

   ngOnInit() {
      this.maquinaId = this.route.snapshot.paramMap.get("uuid");
   }
}
