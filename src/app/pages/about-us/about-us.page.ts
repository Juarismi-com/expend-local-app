import { Component, OnInit } from "@angular/core";
import axios from "axios";
import { environment } from "src/environments/environment";

@Component({
   selector: "app-about-us",
   templateUrl: "./about-us.page.html",
   styleUrls: ["./about-us.page.scss"],
})
export class AboutUsPage implements OnInit {
   version: any;

   constructor() {}

   async ngOnInit() {
      await this.getAboutUs();
   }

   async getAboutUs() {
      const { data } = await axios.get(`${environment.apiUrl}/versiones`);
      this.version = data[0];
   }
}
