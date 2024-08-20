import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { PreventaService } from 'src/app/services/preventa.service';
import { MeService } from 'src/app/services/me.service';

@Component({
  selector: 'app-preventa-list',
  templateUrl: './preventa-list.page.html',
  styleUrls: ['./preventa-list.page.scss'],
})
export class PreventaListPage {
  public preventaList: any[] = [];

  constructor(
    private meService: MeService,
    private preventaService: PreventaService
  ) {}

  ionViewWillEnter() {
    this.getPreventaByVendedorId();
  }

  async handleInputSearch(e: any) {
    const value = e.target.value.toLowerCase();
    this.preventaList = await this.preventaService.searchPreventa(value);
  }

  editPreventa(preventa: any) {
    console.log('editPreventa');
    // @todo should view the preventa-form modal with data
  }

  async getPreventaByVendedorId() {
    const vendedorId: any = await this.meService.getVendedor();
    if (vendedorId) {
      this.preventaList =
        await this.preventaService.getRecentPreventasByVendedorId(vendedorId);
    }
  }
}
