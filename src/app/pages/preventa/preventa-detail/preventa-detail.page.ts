import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StorageService } from 'src/app/services/storage.service';
import { PreventaService } from 'src/app/services/preventa.service';

@Component({
  selector: 'app-preventa-detail',
  templateUrl: './preventa-detail.page.html',
  styleUrls: ['./preventa-detail.page.scss'],
})
export class PreventaDetailPage implements OnInit {
  preventaId: string = '';
  phoneNumber: string = '595983124821';

  public preventaList: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private preventaService: PreventaService
  ) {}

  ngOnInit() {
    this.preventaId = this.route.snapshot.paramMap.get('id')!;
    this.getPreventaDetalleByVendedorId(this.preventaId);
  }

  async getPreventaDetalleByVendedorId(preventaId: string) {
    const usuario: any = await this.storageService.get('usuario');
    if (usuario?.vendedor) {
      // this.preventaList = await this.preventaService.getPreventaByVendedorId(usuario.vendedor?.id);
    }
  }

  openWhatsApp(preventaId: string) {
    const message = `Tx:${preventaId} \n Detalle 1 \n Detalle 2.`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  }
}
