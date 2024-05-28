import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-preventa-list',
  templateUrl: './preventa-list.page.html',
  styleUrls: ['./preventa-list.page.scss'],
})
export class PreventaListPage implements OnInit {

  public preventaList : any[] = [];

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.getPreventaList();
  }


  async getPreventaList(){
    this.preventaList = await this.storage.get("preventa/preventa-list")
  }


  editPreventa(preventa: any){
    console.log("editPreventa");
    // @todo should view the preventa-form modal with data
  }

}
