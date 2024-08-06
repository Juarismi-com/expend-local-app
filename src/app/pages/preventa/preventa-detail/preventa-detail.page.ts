import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreventaService } from 'src/app/services/preventa.service';

@Component({
  selector: 'app-preventa-detail',
  templateUrl: './preventa-detail.page.html',
  styleUrls: ['./preventa-detail.page.scss'],
})
export class PreventaDetailPage implements OnInit {
  preventaId: string = '';
  public preventa: any;

  constructor(
    private route: ActivatedRoute,
    private preventaService: PreventaService
  ) {}

  ngOnInit() {
    this.preventaId = this.route.snapshot.paramMap.get('id')!;
    this.setPreventaDetail();
  }

  async setPreventaDetail(){
    this.preventa = await this.preventaService.getPreventaDetail(this.preventaId);
    console.log(this.preventa);
  }

  openWhatsApp(preventaId: string) {
    const message = `
      Tx: ${preventaId}
      Fecha: ${this.preventa.fecha}
      Total: ${this.preventa.total}
      Estado: ${this.preventa.estado}
    `;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/?text=${encodedMessage}`;
    window.open(url, '_blank');
  }
}
