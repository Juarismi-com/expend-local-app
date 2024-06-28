import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { PreventaService } from 'src/app/services/preventa.service';

@Component({
  selector: 'app-preventa-list',
  templateUrl: './preventa-list.page.html',
  styleUrls: ['./preventa-list.page.scss'],
})
export class PreventaListPage implements OnInit {

  public preventaList : any[] = [];

  constructor(private storage: StorageService, private preventaService: PreventaService) { }

  ngOnInit() {
   
  }

  async handleInputSearch(e: any) {
    const value = e.target.value.toLowerCase();
    this.preventaList =  await this.preventaService.searchPreventa(value)
  }

  editPreventa(preventa: any){
    console.log("editPreventa");
    // @todo should view the preventa-form modal with data
  }

}