import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/services/storage.service';
import { PreventaService } from 'src/app/services/preventa.service';

@Component({
  selector: 'app-dashboard-vendedor',
  templateUrl: './dashboard-vendedor.page.html',
  styleUrls: ['./dashboard-vendedor.page.scss'],
})
export class DashboardVendedorPage implements OnInit {
  apiUrl: string = environment.apiUrl;

  constructor(
    private storageService: StorageService,
    private preventaService: PreventaService
  ) {}

  ngOnInit() {}

  async syncPreventasWithServer() {
    try {
      const preventaList: any[] = await this.storageService.get(
        'preventa/preventa-list'
      );

      if (preventaList && preventaList.length > 0) {
        for (const preventa of preventaList) {
          await this.preventaService.create(preventa);
        }

        console.log('Preventas enviadas con éxito.');
      } else {
        console.log('No hay preventas para sincronizar.');
      }
    } catch (error) {
      console.log('Error al sincronizar las preventas:', error);
    }
  }
}
