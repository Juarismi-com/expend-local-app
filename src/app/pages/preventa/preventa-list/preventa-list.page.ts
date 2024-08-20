import { Component, Input } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { PreventaService } from 'src/app/services/preventa.service';
import { Subscription } from 'rxjs';
import { MeService } from 'src/app/services/auth/me.service';

@Component({
  selector: 'app-preventa-list',
  templateUrl: './preventa-list.page.html',
  styleUrls: ['./preventa-list.page.scss'],
})
export class PreventaListPage{
  public storageSub: Subscription | undefined;
  @Input()
  public usuario: any = null;

  public preventaList : any[] = [];

  constructor(
    private storageService: StorageService,
    private preventaService: PreventaService,
    private meService: MeService
  ) { }

  async ngOnInit() {
    this.storageSub = this.storageService.watchStorage().subscribe(async () => {
      this.usuario = await this.meService.me()
    });
  }

  ionViewWillEnter(){
    this.getPreventaByVendedorId();
  }

  async handleInputSearch(e: any) {
    const value = e.target.value.toLowerCase();
    this.preventaList =  await this.preventaService.searchPreventa(value)
  }

  editPreventa(preventa: any){
    console.log("editPreventa");
    // @todo should view the preventa-form modal with data
  }

  
  async getPreventaByVendedorId(){
    const usuario : any = await this.storageService.get("usuario");
    if (usuario?.vendedor){
      this.preventaList = await this.preventaService.getPreventaByVendedorId(usuario.vendedor?.id);
    }   
  }

}