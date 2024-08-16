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

  async setPreventaDetail() {
    this.preventa = await this.preventaService.getPreventaDetail(
      this.preventaId
    );
    console.log(this.preventa);
  }

  openWhatsApp(preventaId: string) {
    let message = `Tx: ${preventaId}\n`;
    message += `Fecha: ${this.preventa.fecha}\n`;

    message += `Nombre: ${this.preventa.cliente.nombre}\n`;
    message += `RUC/CI: ${
      this.preventa.cliente.ruc || this.preventa.cliente.ci
    }\n`;

    message += `Total: ${this.preventa.total}\n`;
    message += `Estado: ${this.preventa.estado}\n\n`;

    message += `Detalle de productos:\n`;

    this.preventa.detalle.forEach((producto: any, index: number) => {
      message += `${index + 1}. ${producto.producto.nombre}\n`;
      message += `   Cantidad: ${producto.cantidad}\n`;
      message += `   Presentación: ${producto.tipo_envase}\n`;
      message += `   Precio Unitario: ${producto.precio_unitario}\n`;
      message += `   Subtotal: ${producto.subtotal}\n\n`;
    });

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/?text=${encodedMessage}`;
    window.open(url, '_blank');
  }
}
