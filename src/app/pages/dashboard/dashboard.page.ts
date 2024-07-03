import { Component, OnInit } from '@angular/core';
import { PreventaService } from 'src/app/services/preventa.service';
import { MeService } from 'src/app/services/me.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  vendedorID: string = '';
  preventasDelMes: number = 0;
  totalPreventas: number = 0;
  metaVendedor: string = '200000/300000';

  constructor(
    private preventaService: PreventaService,
    private meService: MeService
  ) {}

  async ngOnInit() {
    const { startDate, endDate } = this.getMonthDateRange(new Date());
    this.vendedorID = await this.meService.getVendedor(); 
    this.preventasDelMes = await this.preventaService.getPreventasDelMes(startDate, endDate);
    this.totalPreventas = await this.preventaService.getTotalPreventas();    
  }

  getMonthDateRange(date: Date) {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return {
     startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0]
    };
  }

}
