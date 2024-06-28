import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-geo-simple',
  templateUrl: './geo-simple.page.html',
  styleUrls: ['./geo-simple.page.scss'],
})
export class GeoSimplePage implements OnInit {
  @ViewChild('map',{static: true})
  mapRef!: ElementRef<HTMLElement>;
  map!: GoogleMap;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.createMap()
  }
  
  cerrarModal() {
    this.modalController.dismiss();
  }

  async createMap() {
    this.map = await GoogleMap.create({
      id: 'my-map',
      element: this.mapRef.nativeElement,
      apiKey: "AIzaSyCyff2lEDtZaAQr-vtfpxe6b5gXBxSMMeQ",
      config: {
        center: {
          lat: -25.28646,
          lng: -57.647,
        },
        zoom: 8,
      },
    });
  }
}
