import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-vendedor',
  templateUrl: './dashboard-vendedor.page.html',
  styleUrls: ['./dashboard-vendedor.page.scss'],
})
export class DashboardVendedorPage implements OnInit {
  apiUrl: string = environment.apiUrl;
  
  constructor() { }

  ngOnInit() {
  }

}
